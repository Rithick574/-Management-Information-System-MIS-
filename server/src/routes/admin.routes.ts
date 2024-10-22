import { Router } from "express";   
import { createAdmin, getAdmin, getAllAdmins } from "../controllers/adminController";


const router = Router(); 

router.route("/").post(createAdmin).get(getAllAdmins)
router.route("/:id").get(getAdmin)

export { router as adminRouter };