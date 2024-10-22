import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { AdminModel, ClientModel } from "../models";
import validatePan from "../services/panValidationService";
import ErrorResponse from "../middlewares/errorResponse";
import { z } from "zod";
import { sanitizeInput, sanitizeObject } from "../utils/security";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const clientUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  industry: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,20}$/)
    .optional(),
  address: z.string().min(5).max(200).optional(),
});

const clientCreateSchema = z.object({
  name: z.string().min(2).max(100),
  industry: z.string().min(2).max(50).optional(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,20}$/)
    .optional(),
  address: z.string().min(5).max(200).optional(),
  password: z.string().min(8).max(100),
});

// Get all clients
export const getClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients = await ClientModel.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.status(200).json({
      success: true,
      message: "Clients retrieved successfully",
      data: clients,
    });
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
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sanitizedInput = sanitizeObject(req.body);
    
    try {
      clientCreateSchema.parse(sanitizedInput);
    } catch (validationError: any) {
      next(
        ErrorResponse.badRequest(validationError.errors || "Validation failed")
      );
      return;
    }

    const { name, industry, email, phone, address, password, pan } =
      sanitizedInput;

    const existingClient = await ClientModel.findOne({ where: { email } });
    if (existingClient) {
      next(ErrorResponse.conflict("Client already exists."));
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await ClientModel.create({
      name: name.trim(),
      industry: industry?.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      pan: pan,
      address: address?.trim(),
      password: hashedPassword,
      role: "client",
    });

    const { password: _, ...clientData } = client.get();

    res.status(201).json({
      success: true,
      client: clientData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(ErrorResponse.badRequest("Invalid input data"));
    };
    next(error);
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
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  if (!id || !uuidRegex.test(id)) {
    next(ErrorResponse.badRequest("Invalid client ID"));
    return;
  }
  const sanitizedInput = {
    name: sanitizeInput(req.body.name),
    industry: sanitizeInput(req.body.industry),
    email: sanitizeInput(req.body.email),
    phone: sanitizeInput(req.body.phone),
    address: sanitizeInput(req.body.address),
  };

  try {
    clientUpdateSchema.parse(sanitizedInput);
  } catch (validationError: any) {
    next(
      ErrorResponse.badRequest(validationError.errors || "Invalid input data")
    );
    return;
  }
  try {
    const client = await ClientModel.findByPk(id);

    if (!client) {
      next(ErrorResponse.notFound("Client not found"));
      return;
    }

    if (sanitizedInput.email && sanitizedInput.email !== client.get("email")) {
      const existingClient = await ClientModel.findOne({
        where: { email: sanitizedInput.email },
      });
      if (existingClient) {
        next(ErrorResponse.conflict("Email already in use"));
        return;
      }
    }

    const updateData: Partial<typeof sanitizedInput> = {};
    Object.entries(sanitizedInput).forEach(([key, value]) => {
      if (value !== undefined) {
        updateData[key as keyof typeof sanitizedInput] = value;
      }
    });

    await client.update(updateData);
    await client.reload();
    const { password, ...updatedClient } = client.get();
    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete client details
export const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !uuidRegex.test(id)) {
      next(ErrorResponse.badRequest("Invalid client ID"));
      return;
    }

    const client = await ClientModel.findByPk(id);
    if (!client) {
      next(ErrorResponse.notFound("Client not found"));
      return;
    }
    try {
      await client.destroy();
      res.status(200).json({
        success: true,
        message: "Client deleted successfully",
        deletedId: id,
      });
    } catch (deleteError: any) {
      if (deleteError.name === "SequelizeForeignKeyConstraintError") {
        next(
          ErrorResponse.conflict(
            "Cannot delete client because they have associated records. Please delete related records first."
          )
        );
        return;
      }

      if (deleteError.name === "SequelizeError") {
        next(
          ErrorResponse.internalError(
            "Database error occurred while deleting client"
          )
        );
        return;
      }

      throw deleteError;
    }
  } catch (error: any) {
    console.error("Delete client error:", error);
    next(
      ErrorResponse.internalError(
        "An unexpected error occurred while processing your request"
      )
    );
  }
};
