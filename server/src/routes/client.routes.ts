import express from "express";
import { getClients, createClient, validateClientPan, deleteClient, updateClient } from "../controllers/clientController";

const router = express.Router();

router.route("/").get(getClients).post(createClient);
router.route("/:id").put(updateClient).delete(deleteClient);
router.post('/validate-pan',validateClientPan)

export { router as clientRouter };
