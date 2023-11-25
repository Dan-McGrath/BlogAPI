import { Router } from "express";
import {
  posts_get,
  posts_detail_get,
  post_create_post,
} from "../controllers/postController";

const router = Router();

router.get("/", posts_get);
router.post("/create", post_create_post);
router.get("/:postId", posts_detail_get);

export default router;
