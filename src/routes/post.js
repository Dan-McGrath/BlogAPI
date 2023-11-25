import { Router } from "express";
import {
  posts_get,
  posts_detail_get,
  post_create_post,
} from "../controllers/postController";
import { post_comment_post } from "../controllers/commentController";

const router = Router();

router.get("/", posts_get);
router.post("/create", post_create_post);
router.get("/:postId", posts_detail_get);
router.post("/:postId", post_comment_post);
router.delete("/:postId");

router.put("/:postId/update");


export default router;
