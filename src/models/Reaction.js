import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    targetType: {
      type: String,
      enum: ["POST", "COMMENT"],
      required: true,
    },

    type: {
      type: String,
      enum: ["LIKE", "LOVE", "HAHA", "WOW", "SAD", "ANGRY"],
      default: "LIKE",
      validate: {
        validator: function (value) {
          if (this.targetType === "POST" && value !== "LIKE") {
            return false; 
          }
          return true;
        },
        message: "Posts can only have 'LIKE' reactions. Multiple reactions are reserved for comments only.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ReactionSchema.index({ targetId: 1, targetType: 1, userId: 1 }, { unique: true });
ReactionSchema.index({ userId: 1, createdAt: -1 });

const Reaction = mongoose.models.Reaction || mongoose.model("Reaction", ReactionSchema);
export default Reaction;