import { Card, CardHeader, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findMyPostsData } from "../../features/posts/postSlice";
import { toast } from "react-hot-toast";
import SinglePost from "./SinglePost";
const UserTweets = ({ check }) => {
  const { user } = useSelector((state) => state.auth);
  const { myPosts, postLoading, postError, postSuccess, postMessage } =
    useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postError) {
      toast(postMessage);
    } else {
      dispatch(findMyPostsData());
    }
  }, [dispatch, postError]);
  return (
    <>
      {myPosts?.map((item, index) => {
        return <SinglePost check={check} key={index} {...item} />;
      })}
    </>
  );
};

export default UserTweets;
