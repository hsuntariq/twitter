const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
    },
    dob: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      required: false,
      default:
        "https://no.moreplastic.info/sites/default/files/styles/600x400/public/default_images/avatar.png?itok=e4v_o3Ap",
    },
    coverImage: {
      type: String,
      required: false,
      default:
        "https://d25yuvogekh0nj.cloudfront.net/2019/08/Twitter-Banner-Size-Guide-blog-banner-1250x500.png",
    },
    location: {
      type: String,
      required: false,
      default: "Rawalpindi,Pakistan",
    },
    website: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
