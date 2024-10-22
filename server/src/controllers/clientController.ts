import { Request, Response } from "express";
import { AdminModel, ClientModel } from "../models";
import validatePan from "../services/panValidationService";

// Get all clients
export const getClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients = await ClientModel.findAll();
    res.status(200).json({ success: true, data: clients });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error fetching clients",
      error: error.message,
    });
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

//validate client pan card
export const validateClientPan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { pan } = req.body;
  try {
    const validationResponse = await validatePan(pan);
    res.status(200).json(validationResponse);
  } catch (error: any) {
    res.status(error.status || 500).json({
      status: "error",
      message: error.message,
      errorCode: error.errorCode,
    });
  }
};

//update client details
export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, industry, email, phone, address } = req.body;

  try {
    const client = await ClientModel.findByPk(id);

    if (!client) {
      res.status(404).json({ success: false, message: "Client not found." });
      return;
    }

    client.set({
      name: name || client.get("name"),
      industry: industry || client.get("industry"),
      email: email || client.get("email"),
      phone: phone || client.get("phone"),
      address: address || client.get("address"),
    });

    await client.save();

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: client,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error updating client",
      error: error.message,
    });
  }
};

// Delete client details
export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const client = await ClientModel.findByPk(id);

    if (!client) {
      res.status(404).json({ success: false, message: "Client not found." });
      return;
    }

    await client.destroy();

    res
      .status(200)
      .json({ success: true, message: "Client deleted successfully" });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error deleting client",
      error: error.message,
    });
  }
};
