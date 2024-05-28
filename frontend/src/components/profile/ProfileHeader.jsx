import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="d-flex text-capitalize p-4 bg-white gap-4 align-items-center">
        <FaArrowLeft color="#1CA3F1" size={30} />
        <h5 className="p-0 m-0">{user?.name}</h5>
      </div>
    </>
  );
};

export default ProfileHeader;
