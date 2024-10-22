import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clientRouter } from './routes/client.routes';
import cookieParser from "cookie-parser";
import { userRouter } from './routes/user.routes';
import { adminRouter } from './routes/admin.routes';
import errorHandler from "./middlewares/errorHandler";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("tiny"));

const allowedOrigin = process.env.CLIENT_URL as string;

const corsOptions = {
  credentials: true,
  origin: [allowedOrigin],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
};

app.use(cors(corsOptions));

// Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/users', userRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "API Not Found" });
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
