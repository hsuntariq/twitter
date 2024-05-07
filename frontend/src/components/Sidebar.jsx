import React from "react";
import { sidebarData } from "../data/sidebarData";

const Sidebar = () => {
  return (
    <>
      {sidebarData?.map((item, index) => {
        return (
          <>
            <div className="d-flex align-items-center fs-3 gap-3">
              {item?.icon}
              {item.title}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Sidebar;
