import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clientRouter } from './routes/client.routes';
// import { userRouter } from './routes/userRoutes';
import { adminRouter } from './routes/admin.routes';

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigin = process.env.CLIENT_URL as string;

const corsOptions = {
  credentials: true,
  origin: [allowedOrigin],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
};

app.use(cors(corsOptions));

// Routes
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/admins', adminRouter);
// app.use('/api/v1/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err?.message || "Something went wrong", success: false });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
