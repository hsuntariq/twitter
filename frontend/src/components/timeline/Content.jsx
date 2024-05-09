import React from "react";
import Header from "./Header";
import Tweets from "./Tweets";

const Content = () => {
  return (
    <>
      <div className="col-lg-10 mx-auto">
        <Header />
        <Tweets />
      </div>
    </>
  );
};

export default Content;
