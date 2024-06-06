import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { MdPhoneDisabled } from "react-icons/md";
import { MdPhoneEnabled } from "react-icons/md";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const IncomingCall = ({ myData, setCalling }) => {
  const { allUsers } = useSelector((state) => state.auth);

  const findUser = allUsers?.find((item, index) => {
    return item._id == myData?.caller_id;
  });

  const rejectCall = () => {
    socket.emit("call_rejected", {
      rejector_id: myData?.receiver_id,
      rejected_id: myData?.caller_id,
    });
    setCalling(false);
  };
  const receiveCall = () => {
    window.open(myData?.url, "_blank");
    setCalling(false);
  };

  return (
    <>
      <Card
        className="position-fixed col-lg-3 p-4 rounded-pill border-0 text-white"
        style={{
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1CA3F1",
        }}
      >
        <h5 className="text-center">{findUser?.name} is calling...</h5>
        <div className="d-flex justify-content-center gap-3 ">
          <button className="btn px-5 rounded-pill btn-danger">
            <MdPhoneDisabled onClick={rejectCall} />
          </button>
          <button className="btn px-5 rounded-pill btn-success">
            <MdPhoneEnabled onClick={receiveCall} />
          </button>
        </div>
      </Card>
    </>
  );
};

export default IncomingCall;
