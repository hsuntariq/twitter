const express = require("express");
const {
  uploadTweet,
  getAllTweets,
  makeComment,
  getComment,
} = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload-tweet", authMiddleware, uploadTweet);
router.get("/get-tweets", getAllTweets);
router.get("/get-comment/:id", getComment);
router.post("/make-comment", authMiddleware, makeComment);
module.exports = router;
