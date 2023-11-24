import { Router } from "express";
import { users_get } from "../controllers/userController";

const router = Router();

router.get("/", users_get);

export default router;
