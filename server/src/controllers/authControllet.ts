import { NextFunction, Request, Response } from "express";
import { sanitizeObject } from "../utils/security";
import { z } from "zod";
import ErrorResponse from "../middlewares/errorResponse";
import { generateAccessToken, generateRefreshToken } from "../utils";
import { UserModel } from "../models";

const userCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sanitizedInput = sanitizeObject(req.body);
    const validatedInput = userCredentials.parse(sanitizedInput);
    const { email, password } = validatedInput;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return next(ErrorResponse.unauthorized("Invalid email"));
    }
    if (!user.isActive) {
      return next(ErrorResponse.unauthorized("Account is inactive"));
    }
   
    const isValidPassword = await user.validPassword(password);
    
    if (!isValidPassword) {
      return next(ErrorResponse.unauthorized("Invalid password"));
    }
    const accessToken = generateAccessToken({
      _id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      _id: user.id,
      email: user.email,
      role: user.role,
    });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(ErrorResponse.badRequest("Invalid input data"));
    }
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie("access_token", "", {
      maxAge: 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.cookie("refresh_token", "", {
      maxAge: 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
