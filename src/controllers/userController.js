import User from "../models/user";

import asyncHandler from "express-async-handler";

export const users_get = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();
  res.json({
    users: users,
  });
});

