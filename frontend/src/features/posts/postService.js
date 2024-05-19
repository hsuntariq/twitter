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
