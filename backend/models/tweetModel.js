const mongoose = require("mongoose");

// define structure for your collection/tables

const tweetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    likes: {
      type: Array,
      default: [],
    },
    shares: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tweet", tweetSchema);
