import { Router } from "express";
import { user_detail_get, users_get } from "../controllers/userController";

const router = Router();

router.get("/", users_get);
router.get("/:userId", user_detail_get);
router.put("/:userId/update");
router.delete("/:userId");

export default router;
