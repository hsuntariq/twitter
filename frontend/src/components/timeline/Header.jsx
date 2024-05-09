import React from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Button, Form } from "react-bootstrap";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { LiaChartBarSolid } from "react-icons/lia";
import { BsEmojiGrin } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <div className="d-flex mb-3 rounded-2 flex-column gap-4 bg-white py-3">
        <div
          style={{ borderBottom: "1px solid lightgray" }}
          className="d-flex p-1 px-4 justify-content-between align-items-center"
        >
          <h4 className="fw-bolder">Home</h4>
          <HiOutlineSparkles color="#1CA3F1" size={30} />
        </div>
        <div className="d-flex gap-4 px-4">
          <img
            width={50}
            height={50}
            className="rounded-circle"
            src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
            alt=""
          />
          <Form.Control
            type="text"
            placeholder="Whats happening?"
            className="border-0 hide-default-input-style"
          />
        </div>
        <div className="d-flex px-4 align-items-center justify-content-between">
          <div className="d-flex gap-3">
            <CiImageOn color="#1CA3F1" cursor="pointer" size={30} />
            <CiVideoOn color="#1CA3F1" cursor="pointer" size={30} />
            <LiaChartBarSolid color="#1CA3F1" cursor="pointer" size={30} />
            <BsEmojiGrin color="#1CA3F1" cursor="pointer" size={30} />
          </div>
          <Button
            style={{ background: "#1CA3F1" }}
            className="shadow px-4 py-2 border-0 rounded-pill p-2"
          >
            Tweet
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
