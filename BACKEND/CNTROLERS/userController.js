const { errorLogger } = require("../MIDDLEWARE/errorLogger");
const { USER } = require("../IMPORTS/imports");
class UserControler {
  static getUserData = async (REQ, RES) => {
    if (!REQ.USER_ID) {
      return RES.status(405).json({ status: "err", message: "login again !" });
    }

    try {
      // #TODO
      //  CHANGE THE spellingof invitation code

      let user_info = await USER.findOne(
        { user_id: REQ.USER_ID },
        {
          _id: 0,
          user_id: 1,
          admin: 1,
          name: 1,
          avatar: 1,
        }
      );
      if (!user_info) {
        return RES.status(401).json({
          status: "login",
          message: "login again!",
        });
      }
      // const image = Buffer.from(user_info?.avatar?.image, "base64");
      const image = user_info?.avatar?.image;
      return RES.status(200).json({ status: "ok", data: user_info, image });
    } catch (error) {
      errorLogger(error?.code, "userControler", error?.message || error);
      return RES.status(500).json({
        status: "err",
        message: "something went wrong",
      });
    }
  };

  static getAllUserData = async (REQ, RES) => {
    if (!REQ?.USER_ID)
      return RES.status(400).json({ status: "login", message: "login again" });
    try {
      let data = await USER.find({
        user_id: { $ne: REQ?.USER_ID },
        admin: false,
      });
      if (!data) {
        throw new Error("Something went wrong while fetching data.");
      }
      return RES.status(200).json({ status: "ok", user_data: data });
    } catch (error) {
      if (error?.message) {
        return RES.status(401).json({
          status: "err",
          message: "something went wrong",
        });
      }
      errorLogger(0, "userControler -> getAllUserData", error);
      return RES.status(500).json({
        status: "err",
        message: "something went wrong",
      });
    }
  };

  static deleteUserData = async (REQ, RES) => {
    if (!REQ.USER_ID)
      return RES.status(400).json({ status: "err", message: "login again" });
    try {
      let data = REQ?.body;
      if (!data) throw new Error("something wrong with data try again");
      let user = await USER.findOne({ user_id: REQ.USER_ID });
      if (!user) throw new Error("Login again , something wrong");
      if (!user.admin) throw new Error("unauthorised , You are not a admin");

      for (const item of data) {
        await USER.findOneAndDelete({ user_id: item });
      }
      return RES.status(201).json({ status: "ok", message: "Deleted .." });
    } catch (error) {
      if (error?.message) {
        return RES.status(400).json({ status: "err", message: error?.message });
      } else {
        errorLogger(0, __filename, error);
        return RES.status(500).json({
          status: "err",
          message: "internal server error",
        });
      }
    }
  };

  static editImage = async (REQ, RES) => {
    if (!REQ.USER_ID)
      return RES.status(400).json({
        status: "er",
        message: "something went wrong",
      });
    try {
      let res = await USER.findOneAndUpdate(
        { user_id: REQ?.USER_ID },
        {
          avatar: `${process.env.DB_HOSTED_LINK}/${REQ.file.filename}`,
        }
      );
      if (!res) throw new Error("something wnet wrong");
      return RES.status(201).json({ status: "ok", message: "image edited" });
    } catch (error) {
      if (error?.message) {
        return RES.status(500).json({
          status: "er",
          message: error?.message || "something went wrong",
        });
      }
      return RES.status(500).json({
        status: "er",
        message: error?.message || "something went wrong",
      });
    }
  };
  static changeName = async (REQ, RES) => {
    if (!REQ.USER_ID)
      return RES.status(400).json({
        status: "er",
        message: "something went wrong",
      });
    try {
      if (!REQ?.body?.name) throw new Error("Enter a valid name");
      let res = await USER.findOneAndUpdate(
        { user_id: REQ?.USER_ID },
        {
          name: REQ?.body?.name,
        }
      );
      if (!res) throw new Error("something wnet wrong");
      return RES.status(201).json({ status: "ok", message: "edited" });
    } catch (error) {
      if (error?.message) {
        return RES.status(500).json({
          status: "er",
          message: error?.message || "something went wrong",
        });
      }
      return RES.status(500).json({
        status: "er",
        message: error?.message || "something went wrong",
      });
    }
  };
  static deleteAccount = async (REQ, RES) => {
    if (!REQ.USER_ID)
      return RES.status(400).json({
        status: "er",
        message: "something went wrong",
      });
    try {
      let res = await USER.findOneAndDelete({ user_id: REQ?.USER_ID });
      if (!res) throw new Error("something wnet wrong");
      return RES.status(201).json({ status: "ok", message: "deleted" });
    } catch (error) {
      if (error?.message) {
        return RES.status(500).json({
          status: "er",
          message: error?.message || "something went wrong",
        });
      }
      return RES.status(500).json({
        status: "er",
        message: error?.message || "something went wrong",
      });
    }
  };
}

module.exports = { UserControler };
