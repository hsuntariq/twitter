import axios from "axios";
const base_url = "http://localhost:3001/api/tweets";

export const postTweet = async (tweetData, token) => {
  console.log(tweetData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${base_url}/upload-tweet`,
    tweetData,
    config
  );
  return response.data;
};

export const getAllTweets = async () => {
  const response = await axios.get(`${base_url}/get-tweets`);
  return response.data;
};

export const getComments = async (data) => {
  const response = await axios.get(`${base_url}/get-comment/${data?.post_id}`);
  return response.data;
};

export const getAllComments = async () => {
  const response = await axios.get(`${base_url}/get-comments`);
  return response.data;
};

export const makeComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${base_url}/make-comment`,
    commentData,
    config
  );
  return response.data;
};

export const likeTweet = async (post_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${base_url}/like-tweet/${post_id}`,
    {},
    config
  );
  return response.data;
};

export const shareTweet = async (post_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${base_url}/share-tweet/${post_id}`,
    {},
    config
  );
  return response.data;
};
export const saveTweet = async (saveData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${base_url}/save-tweet/${saveData.post_id}`,
    { content: saveData.content },
    config
  );
  return response.data;
};
