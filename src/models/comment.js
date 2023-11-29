import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 100,
    },
    text: {
      type: String,
      required: true,
      maxLength: 250,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },

    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
