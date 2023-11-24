import User from "../models/user";

import asyncHandler from "express-async-handler";

export const users_get = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();
  res.json({
    users: users,
  });
});

export const user_detail_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).exec();
  res.json({
    user: user,
  });
});
