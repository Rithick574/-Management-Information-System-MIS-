import { Request, Response } from "express";
import { AdminModel, ClientModel } from "../models";

// Get all clients
export const getClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients = await ClientModel.findAll();
    res.status(200).json({ success: true, clients });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Create a new client
export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, industry, email, adminId, phone, address } = req.body;

  if (!name || !email || !adminId) {
    res.status(400).json({
      success: false,
      message: "Name, email, and adminId are required.",
    });
    return;
  }

  try {
    const admin = await AdminModel.findByPk(adminId);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found." });
      return;
    }
    const client = await ClientModel.create({
      name,
      industry,
      email,
      adminId,
      phone,
      address,
    });

    res.status(201).json({ success: true, client });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
