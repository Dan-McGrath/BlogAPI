import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import Post from "../models/post";

export const post_comment_post = [
  body("name").trim().escape(),
  body("text").trim().isLength({ min: 1, max: 250 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const commentDetail = {
      name: req.body.name,
      text: req.body.text,
      post: req.params.postId,
    };

    const comment = new Comment(commentDetail);
    const post = await Post.findById(req.params.postId);
    if (!errors.isEmpty()) {
      res.json({
        comment: comment,
        errors: errors.array(),
      });
      return;
    } else {
      await comment.save();
      post.comments.push(comment._id);
      await post.save();
      if (req.params.commentId) {
        const parentComment = await Comment.findById(req.params.commentId);
        parentComment.replies.push(comment);
        await parentComment.save();
      }
      res.json({
        comment: comment,
      });
    }
  }),
];

export const comment_delete = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  await Comment.deleteMany({ parentComment: req.params.commentId });
  const [post, comments] = await Promise.all([
    Post.findById(req.params.postId).exec(),
    Comment.find({ post: req.params.postId }).exec(),
  ]);

  return res.json({
    post: post,
    comments: comments,
  });
});

// export const post_comments_get = asyncHandler(async (req, res, next) => {
//   const comments = await Comment.find({ post: req.params.postId }).exec();
//   res.json({
//     comments: comments,
//   });
// });

// export const post_comment_detail_get = asyncHandler(async (req, res, next) => {
//   const comment = await Comment.findById(req.params.commentId).exec();
//   res.json({
//     comment: comment,
//   });
// });

// export const comments_of_comments_get = asyncHandler(async (req, res, next) => {
//   const comments = await Comment.find({
//     parentComment: req.params.commentId,
//   }).exec();
//   res.json({
//     comments: comments,
//   });
// });

// export const comment_of_comment_detail_get = asyncHandler(
//   async (req, res, next) => {
//     const comment = await Comment.findById(req.params.cocId).exec();
//     res.json({
//       comment: comment,
//     });
//   }
// );
