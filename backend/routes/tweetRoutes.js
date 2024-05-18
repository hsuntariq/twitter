const express = require("express");
const { uploadTweet, getAllTweets } = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload-tweet", authMiddleware, uploadTweet);
router.get("/get-tweets", getAllTweets);
module.exports = router;
