import express from "express";
import {
  createUser,
  deleteUser,
  getUsersByClient,
  updateUser,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/").post(createUser).get(getUser);
router.route("/:clientId").get(getUsersByClient);
router.route("/:id").put(updateUser).delete(deleteUser);

export { router as userRouter };
