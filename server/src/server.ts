import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { clientRouter } from './routes/clientRoutes';
// import { userRouter } from './routes/userRoutes';

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = process.env.CLIENT_URL as string;

const corsOptions = {
  credentials: true,
  origin: [allowedOrigins],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
};

app.use(cors(corsOptions));

// Routes
// app.use('/api/clients', clientRouter);
// app.use('/api/users', userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;