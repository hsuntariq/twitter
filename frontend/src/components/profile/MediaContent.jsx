import { Typography } from "@mui/material";
import moment from "moment";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const MediaContent = ({
  caption,
  content,
  likes,
  shares,
  createdAt,
  check,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Card className="p-2 border my-2">
        <div className="d-flex gap-4">
          <img
            width={60}
            height={60}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              border: "1px solid #63CCFF",
            }}
            src={user?.image}
            alt="logo"
            className="p-3 "
          />
          <div className="d-flex flex-column  w-100">
            <div className="d-flex gap-3 my-3 align-items-center">
              <Typography variant="h5" className="text-capitalize">
                {user?.name}
              </Typography>
              <Typography variant="p" className="text-secondary">
                {user?.email}
              </Typography>
              <Typography
                className="text-secondary"
                variant="p"
                sx={{ fontSize: "0.9rem", marginLeft: "2.5rem" }}
              >
                {moment(createdAt).fromNow()}
              </Typography>
            </div>

            {content && (
              <>
                {content?.split("/")[4] == "video" ? (
                  <video
                    src={content}
                    controls
                    height={400}
                    width={"100%"}
                    style={{ objectFit: "contain" }}
                  ></video>
                ) : (
                  <img
                    src={content}
                    width={"100%"}
                    height={400}
                    alt=""
                    style={{ objectFit: "contain" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default MediaContent;
