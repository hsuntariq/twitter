import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { Card } from "react-bootstrap";
import { LuDot } from "react-icons/lu";

const Tweets = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <>
            <Card
              className="d-flex  p-4 my-1"
              style={{
                borderBottom: "1px solid lightgray",
                borderTop: "0",
                borderLeft: "0",
                borderRight: "0",
              }}
            >
              <div className="d-flex gap-2">
                <img
                  width={40}
                  height={40}
                  className="rounded-circle"
                  src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
                  alt=""
                />
                <div className="d-flex flex-column ">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h6 className="p-0 m-0">Brie</h6>
                      <p className="text-secondary p-0 m-0">
                        @sketcky <LuDot /> 3m
                      </p>
                    </div>
                    <RiArrowDropDownLine />
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit ea illum, similique itaque, ex tempore ipsam optio
                    perspiciatis aliquam a rem earum fuga nam cum numquam?
                    Quaerat rem ipsa soluta?
                  </p>
                  <div className="d-flex justify-content-between">
                    <IoChatbubbleOutline />
                    <AiOutlineRetweet />
                    <CiHeart />
                    <CiSaveUp2 />
                  </div>
                </div>
              </div>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default Tweets;
