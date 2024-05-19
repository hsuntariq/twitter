const express = require("express");
const {
  registerUser,
  loginUser,
  findMyProfile,
  findAllUsers,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/my-profile/:id", findMyProfile);
router.get("/find-all-users", findAllUsers);

module.exports = router;
