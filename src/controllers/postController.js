import Post from "../models/post";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";

import asyncHandler from "express-async-handler";

export const posts_get = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().exec();
  res.json({
    posts: posts,
  });
});

export const posts_detail_get = asyncHandler(async (req, res, next) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.postId).exec(),
    Comment.find({ post: req.params.postId }).exec(),
  ]);
  res.json({
    post: post,
    comments: comments,
  });
});

export const post_create_post = [
  body("title").trim().isLength({ min: 1, max: 100 }).escape(),
  body("article").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      article: req.body.article,
      user: req.user,
    });

    if (!errors.isEmpty()) {
      res.json({
        post: post,
        errors: errors.array(),
      });
      return;
    } else {
      await post.save();
      res.json({
        post: post,
      });
    }
  }),
];
