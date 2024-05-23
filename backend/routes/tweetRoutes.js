const express = require("express");
const {
  uploadTweet,
  getAllTweets,
  makeComment,
  getComment,
  getAllComments,
  likeTweets,
} = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload-tweet", authMiddleware, uploadTweet);
router.get("/get-tweets", getAllTweets);
router.get("/get-comments", getAllComments);
router.get("/get-comment/:id", getComment);
router.post("/make-comment", authMiddleware, makeComment);
router.post("/like-tweet/:id", authMiddleware, likeTweets);
module.exports = router;
