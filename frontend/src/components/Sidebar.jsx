import React from "react";
import { sidebarData } from "../data/sidebarData";
import { Button } from "react-bootstrap";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {sidebarData?.map((item, index) => {
        return (
          <>
            <Link
              to={`${item?.url}/${user?._id}`}
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center text-dark text-decoration-none side-item p-1 rounded-pill px-4 fw-bold fs-4 gap-3"
            >
              {item?.icon}
              {item.title}
            </Link>
          </>
        );
      })}
      <Button
        onClick={() => dispatch(logout())}
        style={{ background: "#1CA3F1" }}
        className="shadow w-full border-0 rounded-pill p-2"
      >
        Tweet
      </Button>
    </>
  );
};

export default Sidebar;
