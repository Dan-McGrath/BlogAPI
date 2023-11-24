import Post from "../models/post";
import { body, validationResult } from "express-validator";

import asyncHandler from "express-async-handler";

export const posts_get = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().exec();
  res.json({
    posts: posts,
  });
});

export const posts_detail_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).exec();
  res.json({
    post: post,
  });
});
