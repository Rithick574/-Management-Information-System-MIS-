import { NextFunction, Request, Response } from "express";
import { UserModel, ClientModel, ClientUserModal } from "../models";
import { z } from "zod";
import ErrorResponse from "../middlewares/errorResponse";
import { sanitizeObject } from "../utils/security";

const userCreateSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,20}$/)
    .optional(),
  clientId: z.string().uuid(),
  password: z.string().min(8).max(100),
  pan: z.string(),
});

const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,20}$/)
    .optional(),
});

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sanitizedInput = sanitizeObject(req.body);
    const validatedInput = userCreateSchema.parse(sanitizedInput);
    const { name, email, phone, clientId, password, pan } = validatedInput;

    const client = await ClientModel.findByPk(clientId);
    if (!client) {
      return next(ErrorResponse.notFound("Client not found"));
    }

    const existingUser = await UserModel.findOne({
      where: { email },
    });

    if (existingUser) {
      return next(ErrorResponse.conflict("Email already in use."));
    }

    const user = await UserModel.create({
      name,
      email,
      phone,
      password,
      role: "user",
      isActive:true
    });
    const { password: _, ...userData } = user;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    console.log("🚀 ~ file: userController.ts:67 ~ error:", error);
    if (error instanceof z.ZodError) {
      return next(ErrorResponse.badRequest("Invalid input data"));
    }
    next(error);
  }
};

// List users associated with a specific client
export const getUsersByClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { clientId } = req.params;

    const client = await ClientModel.findByPk(clientId);
    if (!client) {
      return next(ErrorResponse.notFound("Client not found."));
    }

    const users = await ClientUserModal.findAll({
      where: { clientId },
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Update user details
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const sanitizedInput = sanitizeObject(req.body);
    const validatedInput = userUpdateSchema.parse(sanitizedInput);

    const user = await UserModel.findByPk(id);
    if (!user) {
      return next(ErrorResponse.notFound("User not found."));
    }

    if (validatedInput.email && validatedInput.email !== user.email) {
      const existingUser = await UserModel.findOne({
        where: { email: validatedInput.email },
      });
      if (existingUser) {
        return next(ErrorResponse.conflict("Email already in use."));
      }
    }

    await user.update(validatedInput);
    const updatedUser = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(ErrorResponse.badRequest("Invalid input data"));
    }
    next(error);
  }
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return next(ErrorResponse.notFound("User not found."));
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

// Get single user details
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return next(ErrorResponse.notFound("User not found."));
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
