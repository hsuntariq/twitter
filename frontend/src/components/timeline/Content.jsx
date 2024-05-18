import React, { useEffect } from "react";
import Header from "./Header";
import Tweets from "./Tweets";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getTweetData, postReset } from "../../features/posts/postSlice";

const Content = () => {
  const { postError, postMessage } = useSelector((state) => state.post);

  return (
    <>
      <div
        style={{ height: "98vh", overflowY: "scroll" }}
        className="col-lg-10 mx-auto"
      >
        <Header />
        <Tweets />
      </div>
    </>
  );
};

export default Content;
