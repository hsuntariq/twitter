const express = require("express");
const { uploadTweet } = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload-tweet", authMiddleware, uploadTweet);

module.exports = router;
