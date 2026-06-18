import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    content: {
      type: String,
      required: [true, "Comment content cannot be empty"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },

    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    reactionsCount: {
      LIKE: { type: Number, default: 0, min: 0 },
      LOVE: { type: Number, default: 0, min: 0 },
      HAHA: { type: Number, default: 0, min: 0 },
      WOW: { type: Number, default: 0, min: 0 },
      SAD: { type: Number, default: 0, min: 0 },
      ANGRY: { type: Number, default: 0, min: 0 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


CommentSchema.index({ postId: 1, parentCommentId: 1, createdAt: -1 });
CommentSchema.index({ parentCommentId: 1, createdAt: 1 });

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;