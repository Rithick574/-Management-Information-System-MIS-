import { Request, Response } from "express";
import { AdminModel } from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

// Create a new admin
export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Username, email, and password are required.",
    });
    return;
  }

  try {
    const existingAdmin = await AdminModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingAdmin) {
      res
        .status(409)
        .json({ success: false, message: "Username or email already in use." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password: _, ...adminResponse } = admin.toJSON();
    res.status(201).json({ success: true, admin: adminResponse });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  const { id, username } = req.params;
  try {
    let admin;
    if (id) {
      admin = await AdminModel.findOne({ where: { id } });
    } else if (username) {
      admin = await AdminModel.findOne({ where: { username } });
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

export const getAllAdmins=async(req:Request,res:Response):Promise<void>=>{
  try {
    const admins = await AdminModel.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
}