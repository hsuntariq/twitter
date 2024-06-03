import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "react-bootstrap";
import { Input, TextField, Typography } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function ChatBox({
  handleClick,
  handleClose,
  open,
  vertical,
  horizontal,
  user,
}) {
  const [message, setMessage] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const handleMessage = () => {
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      alert(data);
    });
  });

  useEffect(() => {
    if (message.length > 0) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [message]);
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center gap-3">
              <img
                width={50}
                height={50}
                className="rounded-circle"
                style={{ border: "1px solid #1CA3F1", objectFit: "contain" }}
                src={user?.image}
                alt=""
              />
              <div className="d-flex flex-column ">
                <Typography variant="h6">{user?.name}</Typography>
                <Typography variant="p" className="text-secondary">
                  {user?.email}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <div
            style={{ height: "50vh", width: "20vw", overflowY: "scroll" }}
            className="message-panel"
          ></div>
          <div className="d-flex justify-content-between align-items-center px-3">
            <TextField
              id="standard-basic"
              label="Send a message..."
              variant="standard"
              multiline
              value={message}
              sx={{ width: "100%" }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IoMdSend
              onClick={handleMessage}
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
          </div>
        </Card>
      </Snackbar>
    </Box>
  );
}
