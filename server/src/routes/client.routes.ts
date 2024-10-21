import express from "express";
import { getClients, createClient } from "../controllers/clientController";

const router = express.Router();

router.route("/").get(getClients).post(createClient);

export { router as clientRouter };
