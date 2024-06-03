const express = require("express");
const {
  uploadTweet,
  getAllTweets,
  makeComment,
  getComment,
  getAllComments,
  likeTweets,
  shareTweet,
  savePost,
  getMyPosts,
} = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload-tweet", authMiddleware, uploadTweet);
router.get("/get-tweets", getAllTweets);
router.get("/get-comments", getAllComments);
router.get("/get-comment/:id", getComment);
router.post("/make-comment", authMiddleware, makeComment);
router.post("/like-tweet/:id", authMiddleware, likeTweets);
router.post("/share-tweet/:id", authMiddleware, shareTweet);
router.post("/save-tweet/:id", authMiddleware, savePost);
router.get("/get-my-posts/:id", getMyPosts);
module.exports = router;
