const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
