import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true, 
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: [
        /^[a-zA-Z0-9_.]+$/,
        "Username can only contain letters, numbers, underscores, and dots",
      ],
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
      index: true,
    },

    password: {
      type: String,
      select: false,
    },

    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RESTRICTED", "BANNED"],
      default: "ACTIVE",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    privacySettings: {
      isAccountPrivate: { type: Boolean, default: false },
      hideLovedPosts: { type: Boolean, default: false },
      hideFollowLists: { type: Boolean, default: false },
    },

    followersCount: { type: Number, default: 0, min: 0 },
    followingCount: { type: Number, default: 0, min: 0 },
    postsCount: { type: Number, default: 0, min: 0 },

    lastLoginAt: { type: Date, default: null },

    verificationCodeHash: { type: String, default: null, select: false },
    verificationCodeExpires: { type: Date, default: null, select: false },
    passwordResetTokenHash: { type: String, default: null, select: false },
    passwordResetExpires: { type: Date, default: null, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.verificationCodeHash;
        delete ret.passwordResetTokenHash;
        return ret;
      },
    },
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;