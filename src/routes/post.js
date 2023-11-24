import { Router } from "express";
import { posts_get, posts_detail_get } from "../controllers/postController";

const router = Router();

router.get("/", posts_get);
router.get("/:postId", posts_detail_get);

export default router;
