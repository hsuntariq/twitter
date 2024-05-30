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
import { FaHeart } from "react-icons/fa";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { PiTagChevronLight } from "react-icons/pi";

import {
  getAllCommentData,
  getTweetData,
  likePost,
  postReset,
  savePost,
  sharePost,
} from "../../features/posts/postSlice";
import { Link } from "react-router-dom";
import { getAllUserData, logout } from "../../features/auth/authSlice";
import { Audio } from "react-loader-spinner";

const Tweets = () => {
  const { user, allUsers } = useSelector((state) => state.auth);
  const {
    postLoading,
    shareLoading,
    shareSuccess,
    shareError,
    comments,
    postError,
    posts,
    postMessage,
    saveLoading,
  } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    } else {
      dispatch(getTweetData());
    }
    dispatch(postReset());

    if (shareError) {
      toast.error(postMessage);
    }
    if (shareSuccess) {
      toast.success("Retweeted");
    }
  }, [dispatch, shareError, shareSuccess]);

  useEffect(() => {
    dispatch(getAllUserData());
  }, [dispatch]);

  return (
    <>
      {posts?.map((post, index) => {
        const findUser = allUsers.find((item, index) => {
          return item?._id == post?.user;
        });
        const checkType = post?.content?.split("/")[4];
        const myComments = comments.filter((item, index) => {
          return item?.post_id == post?._id;
        });

        return (
          <>
            <Card
              className="d-flex  p-4 my-1 "
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
                  style={{ objectFit: "contain", border: "1px solid #1CA3F1" }}
                  src={findUser?.image}
                  alt=""
                />
                <div className="d-flex flex-column w-100 ">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h6 className="p-0 m-0">{findUser?.name}</h6>
                      <p className="text-secondary mx-3 p-0 m-0 ">
                        {findUser?.email}
                        <LuDot /> {moment(post?.createdAt).fromNow()}
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
                            height={"300px"}
                            style={{ objectFit: "contain" }}
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

                  <div className="d-flex   justify-content-between">
                    <Link
                      className="d-flex gap-2 align-items-center text-decoration-none text-dark"
                      to={`/single-post/${post?._id}`}
                    >
                      <IoChatbubbleOutline size={30} cursor="pointer" />
                      <h6 className="fw-bolder text-secondary p-0 m-0">
                        {myComments?.length}
                      </h6>
                    </Link>
                    {shareLoading ? (
                      <Audio
                        height="30px"
                        width="30px"
                        radius="9"
                        color="#2f4d5e"
                        ariaLabel="three-dots-loading"
                        wrapperStyle
                        wrapperClass
                      />
                    ) : (
                      <>
                        {post?.shares.includes(user?._id) ? (
                          <AiOutlineRetweet
                            onClick={() => dispatch(sharePost(post?._id))}
                            size={30}
                            cursor="pointer"
                            color="green"
                          />
                        ) : (
                          <AiOutlineRetweet
                            onClick={() => dispatch(sharePost(post?._id))}
                            size={30}
                            cursor="pointer"
                          />
                        )}
                      </>
                    )}
                    {post?.likes?.includes(user?._id) ? (
                      <>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <FaHeart
                            color="red"
                            onClick={() => dispatch(likePost(post?._id))}
                            size={25}
                            cursor="pointer"
                          />
                          <h6 className="fw-bolder text-secondary p-0 m-0">
                            {post?.likes?.length}
                          </h6>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <CiHeart
                            color=""
                            onClick={() => dispatch(likePost(post?._id))}
                            size={30}
                            cursor="pointer"
                          />
                          <h6 className="fw-bolder text-secondary">
                            {post?.likes?.length}
                          </h6>
                        </div>
                      </>
                    )}

                    {saveLoading ? (
                      <Audio
                        height="30px"
                        width="30px"
                        radius="9"
                        color="#2f4d5e"
                        ariaLabel="three-dots-loading"
                        wrapperStyle
                        wrapperClass
                      />
                    ) : (
                      <PiTagChevronLight
                        style={{ transform: "rotate(90deg)" }}
                        onClick={() =>
                          dispatch(
                            savePost({
                              post_id: post?._id,
                              content: post?.content,
                            })
                          )
                        }
                        size={30}
                        cursor="pointer"
                      />
                    )}
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
