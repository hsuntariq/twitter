import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import {
  createComment,
  getCommentData,
  getTweetData,
  postReset,
} from "../../features/posts/postSlice";
import { getAllUserData } from "../../features/auth/authSlice";
import { Typography, Card, Container, TextField } from "@mui/material";
import { IoMdSend } from "react-icons/io";
const SinglePost = () => {
  // get the posts state
  const { posts, postLoading, postError, postMessage, postSuccess, comments } =
    useSelector((state) => state.post);
  const { allUsers } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    if (comment.length > 0) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [comment]);

  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }
    dispatch(getAllUserData());
    dispatch(getTweetData());
  }, [postError, dispatch]);

  // get specific post
  const findPost = posts?.find((item, index) => {
    return item?._id == id;
  });

  // find user who has uploaded the post

  const findUser = allUsers?.find((item, index) => {
    return item?._id == findPost?.user;
  });
  const checkType = findPost?.content?.split("/")[4];

  // handle error/success in case of comment creation
  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }

    if (postSuccess) {
      toast("Comment added", {
        icon: "🗯",
      });
      setComment("");
    }

    dispatch(postReset());
  }, [postError, postSuccess, dispatch]);

  // make a comment functionality

  const handleComment = (e) => {
    const data = {
      post_id: id,
      comment,
    };

    dispatch(createComment(data));
  };

  // get comments

  useEffect(() => {
    const data = {
      post_id: id,
    };

    dispatch(getCommentData(data));
  }, [dispatch]);

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card className=" shadow position-relative">
          <Row>
            <Col md={8} className="p-0 m-0">
              {checkType == "image" ? (
                <>
                  <img
                    width={"100%"}
                    height={500}
                    src={findPost?.content}
                    alt=""
                  />
                </>
              ) : (
                <>
                  <video
                    src={findPost?.content}
                    controls
                    width={"100%"}
                    height={500}
                    style={{ objectFit: "cover" }}
                  ></video>
                </>
              )}
            </Col>
            <Col md={4} style={{ height: "100%" }} className="p-0 m-0 ">
              <div className="d-flex p-2 text-capitalize gap-2">
                <img
                  width={40}
                  height={40}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
                  className="rounded-circle border"
                  style={{ objectFit: "contain" }}
                  alt=""
                />
                <div className="d-flex flex-column">
                  <Typography variant="h6">{findUser?.name}</Typography>
                  <Typography
                    className="text-secondary"
                    variant="h6"
                    sx={{ fontSize: "0.9rem", textTransform: "lowercase" }}
                  >
                    {findUser?.email}
                  </Typography>
                </div>
              </div>
              <hr />
              <div className="d-flex gap-3">
                <img
                  width={40}
                  height={40}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
                  className="rounded-circle border"
                  style={{ objectFit: "contain" }}
                  alt=""
                />
                <div className="d-flex gap-3 align-items-center">
                  <Typography
                    className="text-capitalize"
                    sx={{ fontSize: "0.9rem" }}
                    variant="h6"
                  >
                    {findUser?.name}
                  </Typography>
                  <p className="text-secondary p-0 m-0">{findPost?.caption}</p>
                </div>
              </div>

              {/* show comments */}
              <div
                className="container my-2"
                style={{ height: "300px", overflowY: "scroll" }}
              >
                {comments?.map((item, index) => {
                  return (
                    <>
                      <div className="d-flex gap-3 my-1 align-items-center">
                        <div className="d-flex gap-3">
                          <img
                            width={20}
                            height={20}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
                            className="rounded-circle border"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                          <Typography
                            className="text-capitalize"
                            sx={{ fontSize: "0.9rem" }}
                            variant="h6"
                          >
                            {findUser?.name}
                          </Typography>
                        </div>
                        <p className="text-secondary p-0 m-0">
                          {item?.comment}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>

              <div
                style={{ width: "33%" }}
                className="p-2 d-flex align-items-center  position-absolute  bottom-0"
              >
                <TextField
                  id="standard-basic"
                  label="Add your comment..."
                  variant="standard"
                  multiline
                  value={comment}
                  sx={{ width: "100%" }}
                  onChange={(e) => setComment(e.target.value)}
                />
                {postLoading ? (
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
                  <IoMdSend
                    onClick={handleComment}
                    cursor="pointer"
                    size={15}
                    style={{
                      transform: `${
                        showBtn ? "translateX(0px)" : "translateX(100px)"
                      } `,
                      transition: "all 0.2s",
                      opacity: `${showBtn ? "1" : "0"}`,
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default SinglePost;
