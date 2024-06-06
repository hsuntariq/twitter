import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { logout } from "../features/auth/authSlice";
import { ContainerFluid } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Trends from "../components/Trends";
import Content from "../components/timeline/Content";
import io from "socket.io-client";
import IncomingCall from "../components/videoCall/IncomingCall";
const socket = io.connect("http://localhost:3001");
const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [myData, setMyData] = useState(null);
  const [calling, setCalling] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    socket.on("incoming_call", (data) => {
      if (data?.receiver_id == user?._id) {
        setCalling(true);
        setMyData(data);
      }
    });
  });
  useEffect(() => {
    socket.on("reject_call", (data) => {
      if (data?.rejected_id == user?._id) {
        alert(`${data?.rejector_id} has rejected your call`);
      }
    });
  });

  return (
    <>
      {calling && <IncomingCall setCalling={setCalling} myData={myData} />}
      <Row>
        <Col
          className="d-flex bg-white p-0 m-0 flex-column gap-5 p-5"
          style={{ height: "100vh", borderRight: "1px solid lightgray" }}
          xl={2}
          lg={3}
        >
          <Sidebar />
        </Col>
        <Col
          className="p-0 m-0"
          style={{ borderRight: "1px solid lightgray" }}
          xl={7}
          lg={6}
        >
          <Content />
        </Col>
        <Col
          className="p-0 m-0"
          xl={3}
          lg={3}
          style={{ height: "99.9vh", overflowY: "scroll" }}
        >
          <Trends />
        </Col>
      </Row>

      {/* <Button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        variant="danger"
      >
        Logout
      </Button> */}
    </>
  );
};

export default HomePage;
