const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    forumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forum",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
    comments: {
      type: Array,
    },
    views: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
