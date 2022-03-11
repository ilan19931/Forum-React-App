const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "new Category",
    },
    admins: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
