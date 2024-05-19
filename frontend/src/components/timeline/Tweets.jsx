import React, { useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { Card } from "react-bootstrap";
import { LuDot } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import TweetLoading from "../Loading/TweetLoading";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getTweetData, postReset } from "../../features/posts/postSlice";
import { Link } from "react-router-dom";

const Tweets = () => {
  const { postLoading, postError, posts, postMessage } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    } else {
      dispatch(getTweetData());
    }
    dispatch(postReset());
  }, [dispatch]);

  return (
    <>
      {posts?.map((post, index) => {
        const checkType = post?.content?.split("/")[4];

        return (
          <>
            <Card
              className="d-flex  p-4 my-1"
              style={{
                borderBottom: "1px solid lightgray",
                borderTop: "0",
                borderLeft: "0",
                borderRight: "0",
              }}
            >
              <div className="d-flex gap-2">
                <img
                  width={40}
                  height={40}
                  className="rounded-circle"
                  src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
                  alt=""
                />
                <div className="d-flex flex-column w-100 ">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h6 className="p-0 m-0">Brie</h6>
                      <p className="text-secondary p-0 m-0">
                        @sketcky <LuDot /> 3m
                      </p>
                    </div>
                    <RiArrowDropDownLine />
                  </div>
                  <p>{post?.caption}</p>

                  {post?.content && (
                    <>
                      {checkType == "image" ? (
                        <>
                          <img
                            width={"100%"}
                            height={"100%"}
                            className="mb-4"
                            alt=""
                            src={post?.content}
                          />
                        </>
                      ) : (
                        <>
                          <video
                            controls
                            width={"100%"}
                            height={"100%"}
                            className="mb-4"
                            alt=""
                            src={post?.content}
                          ></video>
                        </>
                      )}
                    </>
                  )}

                  <div className="d-flex justify-content-between">
                    <Link to={`/single-post/${post?._id}`}>
                      <IoChatbubbleOutline size={30} cursor="pointer" />
                    </Link>
                    <AiOutlineRetweet size={30} cursor="pointer" />
                    <CiHeart size={30} cursor="pointer" />
                    <CiSaveUp2 size={30} cursor="pointer" />
                  </div>
                </div>
              </div>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default Tweets;
