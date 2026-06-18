import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Post content is required"],
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    bannerImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    likesCount: { type: Number, default: 0, min: 0 },
    commentsCount: { type: Number, default: 0, min: 0 },
    viewsCount: { type: Number, default: 0, min: 0 },
    readingTime: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
|--------------------------------------------------------------------------
| OPTIMIZED INDEXES
|--------------------------------------------------------------------------
*/

PostSchema.index({ status: 1, publishedAt: -1 });

PostSchema.index({ authorId: 1, status: 1, publishedAt: -1 });

PostSchema.index({ tags: 1 });

PostSchema.index({
  title: "text",
  excerpt: "text",
  content: "text"
}, {
  weights: {
    title: 10,
    excerpt: 5,
    content: 1
  },
  name: "PostTextSearchIndex"
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;