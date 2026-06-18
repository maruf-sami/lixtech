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
      // index: true সরানো হয়েছে (কারণ এটি নিচের কম্পাউন্ড ইনডেক্সের প্রিফিক্স)
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
      // index: true সরানো হয়েছে
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true, // এটি থাকবে, কারণ standalone publishedAt কুয়েরি হতে পারে
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

// Homepage Feed (পাবলিশড ডেট অনুযায়ী সর্টিং)
PostSchema.index({ status: 1, publishedAt: -1 });

// Author Profile Page (লেখকের পাবলিশড পোস্টগুলো লেটেস্ট ডেট অনুযায়ী দেখাবে)
PostSchema.index({ authorId: 1, status: 1, publishedAt: -1 });

// Tag Search
PostSchema.index({ tags: 1 });

// Full-Text Search
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