import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {
  const { caller_id, receiver_id } = useParams();

  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 635578711;
    const serverSecret = "8854cf409e5af2ac424b0157716479d7";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    const url =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID;

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url: url,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });

    socket.emit("video_call", {
      caller_id,
      receiver_id,
      url,
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
