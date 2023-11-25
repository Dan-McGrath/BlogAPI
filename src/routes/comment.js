import { Router } from "express";
import {
  comment_of_comment_detail_get,
  comments_of_comments_get,
  post_comment_detail_get,
  post_comment_post,
  post_comments_get,
} from "../controllers/commentController";

const router = Router();

router.delete('/:postId')

// router.get("/:postId/comments", post_comments_get);
// router.post("/:postId/comments", post_comment_post);
// router.get("/:postId/comments/:commentId", post_comment_detail_get);
// router.post("/:postId/comments/:commentId", post_comment_post);
// router.put("/:postId/comments/:commentId");
// router.delete("/postId/comments/:commentId");
// router.get("/:postId/comments/:commentId/comments", comments_of_comments_get);
// router.get(
//   "/:postId/comments/:commentId/comments/:cocId",
//   comment_of_comment_detail_get
// );

export default router;
