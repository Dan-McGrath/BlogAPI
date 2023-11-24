import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 100,
    },
    comment: {
      type: String,
      required: true,
      maxLength: 250,
    },
    post: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    ],
    parentComment: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
