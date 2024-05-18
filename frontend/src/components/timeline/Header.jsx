import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Button, Form } from "react-bootstrap";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { LiaChartBarSolid } from "react-icons/lia";
import { BsEmojiGrin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { postReset, uploadTweet } from "../../features/posts/postSlice";
import { FadeLoader } from "react-spinners";
import { Audio } from "react-loader-spinner";
import { toast } from "react-hot-toast";
const Header = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // get the state into the component, using useSelector hook
  const { postLoading, postError, postSuccess, postMessage } = useSelector(
    (state) => state.post
  );

  // get the useDispatch hook to fire/call the functions in the slice
  const dispatch = useDispatch();

  // username:dwtsjgcyf
  // upload_preset:ls8frk5v

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL?.createObjectURL(file);
    setImagePreview(url);
    setImage(file);
  };

  // upload the image to the cloudinary
  const uploadImage = async () => {
    // get data from the input fields
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ls8frk5v");
    // request to the cloudinary's api
    try {
      setImageLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload",
        data
      );
      setImageLoading(false);
      return response?.data?.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleTweet = async () => {
    const imageData = await uploadImage(image);
    const tweetData = {
      caption,
      content: imageData,
    };

    dispatch(uploadTweet(tweetData));
  };

  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }
    if (postSuccess) {
      toast.success("Tweeted Successfully", {
        icon: "🐥",
      });
      setImagePreview(null);
      setImage(null);
      setCaption("");
    }
    dispatch(postReset());
  }, [postError, postSuccess, postMessage, dispatch]);

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
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {imagePreview && (
          <div className="w-50 mx-auto d-block" style={{ height: "250px" }}>
            <img
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "contain" }}
              src={imagePreview}
              alt=""
            />
          </div>
        )}

        <div className="d-flex px-4 align-items-center justify-content-between">
          <div className="d-flex gap-3">
            <div className="position-relative">
              <CiImageOn color="#1CA3F1" cursor="pointer" size={30} />
              <input
                type="file"
                onChange={handleImageChange}
                className="position-absolute"
                style={{
                  transform: "translate(-200%)",
                  opacity: "0",
                  cursor: "pointer",
                  width: "30%",
                }}
              />
            </div>
            <CiVideoOn color="#1CA3F1" cursor="pointer" size={30} />
            <LiaChartBarSolid color="#1CA3F1" cursor="pointer" size={30} />
            <BsEmojiGrin color="#1CA3F1" cursor="pointer" size={30} />
          </div>
          <Button
            disabled={imageLoading || postLoading}
            onClick={handleTweet}
            style={{ background: "#1CA3F1" }}
            className="shadow px-4 py-2 border-0 rounded-pill p-2"
          >
            {imageLoading || postLoading ? (
              <Audio
                height="30px"
                width="100px"
                radius="9"
                color="#2f4d5e"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
              />
            ) : (
              "Tweet"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
