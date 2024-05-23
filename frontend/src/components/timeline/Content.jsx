import React, { useEffect } from "react";
import Header from "./Header";
import Tweets from "./Tweets";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getAllCommentData,
  getTweetData,
  postReset,
} from "../../features/posts/postSlice";
import TweetLoading from "../Loading/TweetLoading";

const Content = () => {
  const { postError, postMessage, postLoading, comments } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCommentData());
  }, [dispatch]);
  return (
    <>
      <div
        style={{ height: "98vh", overflowY: "scroll" }}
        className="col-lg-10 mx-auto"
      >
        <Header />
        {postLoading ? <TweetLoading /> : <Tweets />}
      </div>
    </>
  );
};

export default Content;
