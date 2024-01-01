const { USER, JWT, bcrypt } = require("../IMPORTS/imports");
const { errorLogger } = require("../MIDDLEWARE/errorLogger");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const folder_destination = path.join(__dirname, "..", "avatars");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

class loginSignup {
  static LOGIN = async (req, res) => {
    const { user_id, pass } = req.body;
    if (!user_id || !pass)
      return res
        .status(403)
        .json({ status: "err", message: "All the fields are required !" });

    try {
      const foundUser = await USER.findOne({ user_id });
      if (!foundUser || !(await bcrypt.compare(pass, foundUser.password))) {
        return res
          .status(401)
          .json({ status: "err", message: "invalid credentials !" });
      }

      const access_token = JWT.sign(
        { user_id: foundUser.user_id },
        ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const refresh_token = JWT.sign(
        { user_id: foundUser.user_id },
        REFRESH_SECRET,
        { expiresIn: "1d" }
      );
      await USER.findOneAndUpdate(
        { user_id: foundUser.user_id },
        {
          refreshToken: refresh_token,
        }
      );
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ status: "ok", message: "logged in", access_token });
    } catch (error) {
      errorLogger(error?.code, "loginSignup", error?.message || error);
      return res
        .status(500)
        .json({ status: "err", message: "internal server error" });
    }
  };

  static SIGNUP = async (req, res) => {
    const { pass, email, phoneNumber, name, make_admin } = req.body;
    console.log(make_admin);
    if (!pass || !name || (!phoneNumber && !email))
      return res
        .status(400)
        .json({ status: "err", message: "All fields are required" });
    try {
      if (
        email &&
        phoneNumber &&
        phoneNumber?.length === 10 &&
        email?.inclues("@")
      ) {
        return res.status(400).join({
          status: "err",
          message: "You have entered both Phone and Email enter any one.",
        });
      }
      let user_id;
      if (phoneNumber?.length === 10) {
        user_id = phoneNumber;
      } else if (email?.length >= 8 && email?.includes("@")) {
        user_id = email;
      } else {
        return res
          .status(400)
          .json({ status: "err", message: "Some fields are incorrect" });
      }
      // hash the password
      const hashed_pass = await bcrypt.hash(pass, 8);
      // GENERATE THE ACCESS TOKEN AND REFRESH TOKEN
      const access_token = JWT.sign({ user_id }, ACCESS_SECRET, {
        expiresIn: "10m",
      });

      const refresh_token = JWT.sign({ user_id }, REFRESH_SECRET, {
        expiresIn: "1d",
      });
      let isCreated = await USER.create({
        password: hashed_pass,
        user_id,
        admin: make_admin === true ? true : false,
        name,
        refreshToken: refresh_token,
        avatar: `${process.env.DB_HOSTED_LINK}/${req.file.filename}`,
      });
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return isCreated
        ? res
            .status(201)
            .json({ status: "ok", message: "created", access_token })
        : res.status(500).json({ message: "failed to create user" });
    } catch (error) {
      if (error?.code === 11000) {
        return res.status(409).json({
          status: "err",
          message: `${
            Object.keys(error?.keyPattern)[0] || "field"
          } already exist`,
        });
      } else if (error?.code === 72 || error?.code === 53) {
        return res.status(409).json({ status: "err", message: "invalid data" });
      } else {
        errorLogger(
          error?.code,
          "loginSignupControler",
          error?.message || error
        );
        return res.status(500).json({ message: "internal server error" });
      }
    }
  };

  static LOGOUT = async (req, res) => {
    try {
      res.clearCookie("jwt");
      await USER.findOneAndUpdate(
        { user_id: req.USER_ID },
        {
          refreshToken: "",
        }
      );
      res.send({ status: "loged out" });
    } catch (error) {
      return res.send({ status: "something went wrong" });
    }
  };
}

function upload_image(image) {}
module.exports = { loginSignup };
