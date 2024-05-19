import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getTweetData } from "../../features/posts/postSlice";
import { getAllUserData } from "../../features/auth/authSlice";
const SinglePost = () => {
  // get the posts state
  const { posts, postLoading, postError, postMessage } = useSelector(
    (state) => state.post
  );
  const { allUsers } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();

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

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
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
          <Col md={6}>
            <div className="d-flex text-capitalize gap-2">
              <img
                width={40}
                height={40}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
                className="rounded-circle border"
                style={{ objectFit: "contain" }}
                alt=""
              />
              <h5>{findUser?.name}</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SinglePost;
