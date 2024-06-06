import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "react-bootstrap";
import { Input, TextField, Typography } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaVideo } from "react-icons/fa";

import io from "socket.io-client";
import { useSelector } from "react-redux";
import { PiArrowFatLinesLeftLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

export default function ChatBox({
  handleClick,
  handleClose,
  open,
  vertical,
  horizontal,
  selectedUser,
  message,
  setMessage,
}) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const [showBtn, setShowBtn] = useState(false);

  const handleMessage = () => {
    socket.emit("sent_message", {
      message,
      message_from: user?._id,
      message_to: selectedUser?._id,
    });
    setSentMessages([
      ...sentMessages,
      {
        message,
        message_from: user?._id,
        message_to: selectedUser?._id,
        time: Date.now(),
        sent: true,
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      if (data?.message_to == user?._id) {
        setReceivedMessages([
          ...receivedMessages,
          {
            message: data?.message,
            message_from: data.message_from,
            message_to: data?.message_to,
            time: Date.now(),
            sent: false,
          },
        ]);
      }
    });
  });

  const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
    return a.time - b.time;
  });

  const myMessages = allMessages.filter((item, index) => {
    return (
      (item.message_from == user?._id &&
        item.message_to == selectedUser?._id) ||
      (item.message_from == selectedUser?._id && user?._id)
    );
  });

  useEffect(() => {
    if (message.length > 0) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [message]);

  // handle video call

  const onVideoCall = () => {
    window.open(`video-call/${user?._id}/${selectedUser?._id}`, "_blank");
  };

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
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img
                  width={50}
                  height={50}
                  className="rounded-circle"
                  style={{ border: "1px solid #1CA3F1", objectFit: "contain" }}
                  src={selectedUser?.image}
                  alt=""
                />
                <div className="d-flex flex-column ">
                  <Typography variant="h6">{selectedUser?.name}</Typography>
                  <Typography variant="p" className="text-secondary">
                    {selectedUser?.email}
                  </Typography>
                </div>
              </div>

              <div className="icons">
                <FaVideo onClick={onVideoCall} size={30} cursor="pointer" />
              </div>
            </div>
          </CardHeader>
          <div
            style={{ height: "50vh", width: "20vw", overflowY: "scroll" }}
            className="message-panel"
          >
            {myMessages?.map((msg, index) => {
              return (
                <>
                  {msg.sent ? (
                    <div
                      className="bg-success text-white my-1 ms-auto rounded-pill p-1 px-3 "
                      style={{
                        wordWrap: "break-word",
                        maxWidth: "75%",
                        width: "max-content",
                      }}
                    >
                      <Typography variant="p">{msg?.message}</Typography>
                    </div>
                  ) : (
                    <div
                      className="bg-secondary text-white my-1 rounded-pill p-1 px-3 "
                      style={{
                        wordWrap: "break-word",
                        maxWidth: "75%",
                        width: "max-content",
                      }}
                    >
                      <Typography variant="p">{msg?.message}</Typography>
                    </div>
                  )}
                </>
              );
            })}
          </div>
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
