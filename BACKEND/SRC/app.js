require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { loginSignup } = require("../CNTROLERS/loginSignupControler");
const { authorised } = require("../MIDDLEWARE/verifyJWT");
const { UserControler } = require("../CNTROLERS/userController");
const { mongoose, multer, fs } = require("../IMPORTS/imports");
const { handleRefreshToken } = require("../CNTROLERS/refreshTokenControler");
let { USER } = require("../MODALS/db");
const path = require("path");
const folder_destination = path.join(__dirname, "..", "avatars");

const app = express();
const PORT = process.env.PORT;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.access(folder_destination, fs.constants.F_OK, async (err) => {
      if (err) {
        fs.mkdir(folder_destination, { recursive: true }, (err) => {
          if (err) {
            errorLogger(0, "file upload", err);
            return cb(err, folder_destination);
          } else {
            cb(null, folder_destination);
          }
        });
      } else {
        cb(null, folder_destination);
      }
    });
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + Math.random() * 100000;
    cb(null, Date.now() + "" + file.originalname);
  },
});
const uploads = multer({ storage: storage });

// PRODUCTION ENVIRONMENT
// check for the environment variables
if (!process.env.PORT || !process.env.WHITELIST || !process.env.DB_LINK) {
  console.error(new Error("ENVIRONMENT VARIABLES ARE NOT ACCESSIBLE"));
} else {
  app.listen(PORT, (error) => {
    if (error) {
      console.error(new Error("Internal server error"));
    } else {
      mongoose
        .connect(DB_LINK)
        .then((db) => {
          console.log("db connected and listening on " + PORT);
        })
        .catch((error) => console.error(new Error(error)));
    }
  });
}

const WHITELIST = process.env.WHITELIST;
const DB_LINK = process.env.DB_LINK;

// middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (WHITELIST.includes(`${origin}`)) {
//         cb(null, true);
//       } else {
//         cb(new Error("Permission denied"));
//       }
//     },
//     optionsSuccessStatus: 200,
//     preflightContinue: true,
//     credentials: true,
//     allowedHeaders: "Content-Type, Authorization, Accept, X-Requested-With",
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: WHITELIST,
  })
);
app.use(express.static(path.join(__dirname, "..", "avatars")));

// ------------

app.post("/login", loginSignup.LOGIN);
app.get("/logout", authorised, loginSignup.LOGOUT);
app.post("/signup", uploads.single("avatar"), loginSignup.SIGNUP);

app.get("/refresh", handleRefreshToken);
app.get("/user_data", authorised, UserControler.getUserData);
app.get("/getAllUserData", authorised, UserControler.getAllUserData);
app.post("/delete_users", authorised, UserControler.deleteUserData);
app.post(
  "/editImage",
  authorised,
  uploads.single("avatar"),

  UserControler.editImage
);
app.post("/editName", authorised, UserControler.changeName);
app.get("/deleteAccount", authorised, UserControler.deleteAccount);
app.get("", (req, res) => {
  res.send("route not found");
});
