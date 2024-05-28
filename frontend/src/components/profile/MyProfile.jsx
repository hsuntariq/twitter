import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@mui/material";
import { RxDot } from "react-icons/rx";
import UserInfo from "./UserInfo";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <ProfileHeader />
      <div className="position-relative">
        <img
          width={"100%"}
          height={300}
          style={{ objectFit: "cover" }}
          src={user?.coverImage}
          alt="cover image"
        />
        <img
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            bottom: "-20%",
            left: "2%",
          }}
          src={user?.image}
          alt="profile image"
          className="position-absolute p-3 bg-white rounded-circle"
        />
      </div>
      <div className="d-flex justify-content-end p-3 align-items-center gap-3">
        <div
          className=" rounded-circle  d-flex justify-content-center align-items-center"
          style={{
            border: "1px solid #1CA3F1",
            width: "40px",
            height: "40px",
          }}
        >
          <RxDot color="#1CA3F1" size={10} className="fw-bolder" />
          <RxDot color="#1CA3F1" size={10} className="fw-bolder" />
          <RxDot color="#1CA3F1" size={10} className="fw-bolder" />
        </div>
        <Button
          className="fw-bold rounded-pill "
          sx={{
            border: "1px solid #1CA3F1",
            color: "#1CA3F1",
            padding: "0.4rem 1rem",
          }}
        >
          Follow
        </Button>
      </div>

      <UserInfo />
    </>
  );
};

export default MyProfile;
