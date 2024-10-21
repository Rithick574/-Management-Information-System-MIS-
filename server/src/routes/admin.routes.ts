import { Router } from "express";   
import { createAdmin } from "../controllers/adminController";


const router = Router();

router.post("/", createAdmin);

export { router as adminRouter };