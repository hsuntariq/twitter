import React from "react";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { IoBalloonOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import moment from "moment";
import { useParams } from "react-router-dom";

const UserInfo = () => {
  const { user, allUsers } = useSelector((state) => state.auth);
  const { id } = useParams();

  const findUser = allUsers?.find((item, index) => {
    return item?._id == id;
  });
  return (
    <>
      <div className="d-flex px-5 flex-column">
        <div className="name">
          <h1 className="fw-bolder text-capitalize">{findUser?.name}</h1>
          <p className="text-seconadary">{findUser?.email}</p>
        </div>
        <div className="bio">
          <p>{findUser?.bio}</p>
        </div>
        <div className="text-secondary row">
          <div className="col-md-4 col-lg-6 col-xl-3">
            <div className="d-flex fs-6 gap-1 align-items-center">
              <CiLocationOn />
              {findUser?.location}
            </div>
          </div>

          <div className="col-md-4 col-lg-6 col-xl-3">
            <div className="d-flex fs-6 gap-1 align-items-center">
              <FaLink />
              {findUser?.website ? findUser?.website : "No website"}
            </div>
          </div>
          <div className="col-md-4 col-lg-6 col-xl-3">
            <div className="d-flex fs-6 gap-1 align-items-center">
              <IoBalloonOutline />
              Born {findUser?.dob}
            </div>
          </div>
          <div className="col-md-4 col-lg-6 col-xl-3">
            <div className="d-flex fs-6 gap-1 align-items-center">
              <SlCalender />
              Joined {moment(findUser?.createdAt).format("MMM YYYY")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
