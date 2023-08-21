const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseResponse = require("../interfaces/response.interface");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.protecting = async (req, res, next) => {
  try {
    //skip check voi signin va signup
    console.log(req.path);
    if (
      !req.path.includes("/v1/api") ||
      req.path.endsWith("SignIn") ||
      req.path.endsWith("SignUp")
    ) {
      next();
      return;
    }
    //1. lay token tu req header
    let token;
    let auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer")) {
      //cat chuoi || thay doi chuoi
      token = auth.replace("Bearer", "");
    }
    if (!token) {
      console.log("Token null");
      return res
        .status(403)
        .json(
          new BaseResponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN)
        );
    }
    //2. Verify token
    let decodePromise = new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
    let decoded = await decodePromise;
    console.log(decoded);
    //3.Kiem tra user con ton tai hay khong
    let user = await User.findOne({ username: decoded.username });
    if (!user) {
      console.log("User not exist");
      return res
        .status(403)
        .json(
          new BaseResponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN)
        );
    }
    // 3.1 user có đang active hay không
    if (!user.status) {
      console.log("User inactivated");
      return res
        .status(403)
        .json(
          new BaseResponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN)
        );
    }
    //4.User da doi password
    let pwdInDb = decoded.hashed;
    console.log(pwdInDb);
    console.log(user.password);
    if (pwdInDb !== user.password) {
      console.log("User changed password");
      return res
        .status(403)
        .json(
          new BaseResponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN)
        );
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(e);
    return res
      .status(403)
      .json(
        new BaseResponse(ResponseCode.FORBIDDEN, ResponseMessage.FORBIDDEN)
      );
  }
};
