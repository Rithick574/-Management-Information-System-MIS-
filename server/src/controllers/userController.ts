import { Request, Response } from "express";


const users: Array<{ id: number; username: string; password: string }> = [];

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json({ users });
};

export const createUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ user: newUser });
};
