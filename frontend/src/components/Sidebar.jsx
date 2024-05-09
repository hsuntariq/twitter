import React from "react";
import { sidebarData } from "../data/sidebarData";
import { Button } from "react-bootstrap";
const Sidebar = () => {
  return (
    <>
      {sidebarData?.map((item, index) => {
        return (
          <>
            <div className="d-flex align-items-center fw-bold fs-4 gap-3">
              {item?.icon}
              {item.title}
            </div>
          </>
        );
      })}
      <Button
        style={{ background: "#1CA3F1" }}
        className="shadow w-full border-0 rounded-pill p-2"
      >
        Tweet
      </Button>
    </>
  );
};

export default Sidebar;
