import { Router } from "express";
import {
  comment_of_comment_detail_get,
  comments_of_comments_get,
  post_comment_detail_get,
  post_comments_get,
} from "../controllers/commentController";

const router = Router();

router.get("/:postId/comments", post_comments_get);
router.get("/:postId/comments/:commentId", post_comment_detail_get);
router.get("/:postId/comments/:commentId/comments", comments_of_comments_get);
router.get(
  "/:postId/comments/:commentId/comments/:cocId",
  comment_of_comment_detail_get
);

export default router;
