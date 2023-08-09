const express = require("express");
const { checkAuth, userLogin } = require("../controller/loginController");
const { signupUser } = require("../controller/signupController");
const router = express.Router();

const todoRouter = require("./todo");
const { userLogout } = require("../controller/logoutController");
const { ChangePassword } = require("../controller/passwordController");

router.use("/todo", todoRouter);

router.get("/checkAuth", checkAuth);
router.post("/signup", signupUser);
router.post("/login", userLogin);
router.post("/forgetPassword", ChangePassword);

router.get("/logout", userLogout);

module.exports = router;
