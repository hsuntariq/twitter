import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "react-loading-skeleton/dist/skeleton.css";
import SinglePost from "./pages/posts/SinglePost";
import Profile from "./pages/profile/Profile";
import VideoCall from "./components/videoCall/VideoCall";
function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/single-post/:id" element={<SinglePost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/video-call/:caller_id/:receiver_id"
            element={<VideoCall />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
