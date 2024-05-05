import express from "express";
import { getAdmins, login, register } from "../controllers/admin.js";

const router = express.Router();

router.get("/getAdmins", getAdmins);
router.post("/login", login);
router.post("/register", register)

export default router;
