import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ChatBox from "./profile/ChatBox";

const Trends = () => {
  const { allUsers } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    selectedUser: null,
  });

  const handleClick = (newState, user) => () => {
    setState({ ...state, ...newState, open: true, selectedUser: user });
  };

  const handleClose = () => {
    setState({ ...state, open: false, selectedUser: null });
  };

  const { vertical, horizontal, open, selectedUser } = state;

  return (
    <>
      <ChatBox
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
        vertical={vertical}
        horizontal={horizontal}
        user={selectedUser}
      />
      {allUsers?.map((item, index) => (
        <Card key={index} className="p-2 my-1 mx-auto rounded-0">
          <div className="d-flex gap-3">
            <img
              style={{ border: "1px solid #1CA3F1", objectFit: "contain" }}
              width={50}
              height={50}
              className="rounded-circle p-2"
              src={item?.image}
              alt=""
            />
            <div className="d-flex flex-column">
              <Typography className="text-capitalize" variant="h6">
                {item?.name}
              </Typography>
              <div className="d-flex gap-3">
                <Link to={`/profile/${item?._id}`}>
                  <Button
                    variant="contained"
                    sx={{ background: "#1CA3F1", color: "white" }}
                    size="small"
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  onClick={handleClick(
                    { vertical: "bottom", horizontal: "right" },
                    item
                  )}
                  variant="contained"
                  size="small"
                >
                  Message
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Trends;
