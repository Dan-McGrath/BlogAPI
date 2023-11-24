import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

export const post_comments_get = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId }).exec();
  res.json({
    comments: comments,
  });
});

export const post_comment_detail_get = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId).exec();
  res.json({
    comment: comment,
  });
});

export const comments_of_comments_get = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    parentComment: req.params.commentId,
  }).exec();
  res.json({
    comments: comments,
  });
});

export const comment_of_comment_detail_get = asyncHandler(
  async (req, res, next) => {
    const comment = await Comment.findById(req.params.cocId).exec();
    res.json({
      comment: comment,
    });
  }
);

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
    if (req.params.commentId)
      commentDetail.parentComment = req.params.commentId;

    const comment = new Comment(commentDetail);

    if (!errors.isEmpty()) {
      res.json({
        comment: comment,
        errors: errors.array(),
      });
      return;
    } else {
      await comment.save();
      return
    }
  }),
];
