import { Request, Response } from "express";
import { UserModel } from "../models";
import bcrypt from "bcryptjs";

// Create a new admin
export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Username, email, and password are required.",
    });
    return;
  }

  try {
    const existingAdmin = await UserModel.findOne({
      where: { email, role: "admin" },
    });

    if (existingAdmin) {
      res
        .status(409)
        .json({ success: false, message: "Email already in use by an admin" });
      return;
    }

    const admin = await UserModel.create({
      name,
      email,
      password,
      role: "admin",
      isActive: true,
    });
    const { password: _, ...adminResponse } = admin.toJSON();
    res.status(201).json({ success: true, admin: adminResponse });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get admin by id and email
export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  const { id, email } = req.params;
  try {
    let admin;
    if (id) {
      admin = await UserModel.findOne({ where: { id, role: "admin" } });
    } else if (email) {
      admin = await UserModel.findOne({ where: { email, role: "admin" } });
    }
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

//get all admins
export const getAllAdmins = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const admins = await UserModel.findAll({ where: { role: "admin" } });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};
