const AsyncHandler = require("express-async-handler");
const tweet = require("../models/tweetModel");
const commentModal = require("../models/commentModel");
const saveModal = require("../models/saveModal");

const uploadTweet = AsyncHandler(async (req, res) => {
  // get the value from the frontend
  const { caption, content } = req.body;
  try {
    const newTweet = await tweet.create({
      user: req.user._id,
      caption,
      content,
    });
    res.send(newTweet);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const getAllTweets = AsyncHandler(async (req, res) => {
  const allTweets = await tweet.find().sort({ createdAt: -1 });
  res.send(allTweets);
});

const makeComment = AsyncHandler(async (req, res) => {
  const { user_id, post_id, comment } = req.body;
  const findPost = await tweet.findOne({ _id: post_id });
  if (!findPost) {
    res.status(404);
    throw new Error("post not found");
  } else {
    const newComment = await commentModal.create({
      user_id: req.user._id,
      post_id,
      comment,
    });
    res.send(newComment);
  }
});

const getComment = AsyncHandler(async (req, res) => {
  const post_id = req.params.id;
  if (!post_id) {
    res.status(400);
    throw new Error("Please select a post");
  }
  const findComments = await commentModal.find({ post_id });
  res.send(findComments);
});

const getAllComments = AsyncHandler(async (req, res) => {
  const allComments = await commentModal.find();
  res.send(allComments);
});

const likeTweets = AsyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const findPost = await tweet.findOne({ _id: post_id });
  if (!findPost) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    if (findPost.likes.includes(req.user._id)) {
      findPost.likes.pull(req.user._id);
    } else {
      findPost.likes.push(req.user._id);
    }
  }
  await findPost.save();
  res.send(findPost);
});

const shareTweet = AsyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const findPost = await tweet.findOne({ _id: post_id });
  if (!findPost) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    if (findPost.shares.includes(req.user._id)) {
      findPost.shares.pull(req.user._id);
    } else {
      findPost.shares.push(req.user._id);
    }

    await findPost.save();
    res.send(findPost);
  }
});

const savePost = AsyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const { content } = req.body;
  const findPost = await tweet.findOne({ _id: post_id });
  if (!findPost) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    const savedPost = await saveModal.create({
      post_id,
      user_id: req.user._id,
      content,
    });
    res.send(savedPost);
  }
});

const getMyPosts = AsyncHandler(async (req, res) => {
  const findPosts = await tweet
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });
  if (!findPosts) {
    throw new Error("No Posts yet");
  } else {
    res.send(findPosts);
  }
});

module.exports = {
  uploadTweet,
  getAllTweets,
  makeComment,
  getComment,
  getAllComments,
  likeTweets,
  shareTweet,
  savePost,
  getMyPosts,
};
