const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "new Forum",
    },
    admins: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("forum", forumSchema);
