const { default: mongoose } = require("mongoose");
const { ResponseCode, ResponseMessage } = require("../constans/response_code");
const BaseResponse = require("../interfaces/response.interface");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/api.route");

const AuthController = {
  signUp: async (req, res, next) => {
    try {
      //lay req body
      let body = req.body;
      //Validate body data

      //kiem tra trong username trong db
      let existed = await User.findOne({ username: body.username });
      if (existed) {
        res
          .status(500)
          .json(
            new BaseResponse(
              ResponseCode.USER_EXISTED,
              ResponseMessage.USER_EXISTED
            )
          );
        return;
      }

      //khoi tao model
      let user = new User({
        username: body.username,
        password: body.password,
        salt: "",
        email: body.email,
        phone: body.phone,
        status: true,
        createdBy: body.username,
        createdDate: req.currentDate,
        updatedBy: body.username,
        updatedDate: req.currentDate,
      });
      //luu vao db
      let data = await user.save();

      let token = this.generateToken(data);
      console.log(token);
      //response
      res
        .status(201)
        .json(
          new BaseResponse(
            ResponseCode.SUCCESSFUL,
            ResponseMessage.SUCCESSFUL,
            data
          )
        );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(
          new BaseResponse(
            ResponseCode.INTERNAL_SERVER_ERROR,
            ResponseMessage.INTERNAL_SERVER_ERROR
          )
        );
    }
  },
  signIn: async (req, res, next) => {
    //lay req body
    let body = req.body;
    // lay trong db ra ban ghi co username = body.username
    let user = await User.findOne({ username: body.username });
    if (!user) {
      res
        .status(404)
        .json(
          new BaseResponse(
            ResponseCode.USER_NOT_EXISTED,
            ResponseMessage.USER_NOT_EXISTED
          )
        );
      return;
    }
    //kiem tra mat khau
    let pwdInDb = user.password;
    let pwd = body.password;
    if (!bcrypt.compareSync(pwd, pwdInDb)) {
      return res
        .status(401)
        .json(
          new BaseResponse(
            ResponseCode.UNAUTHORIZED,
            ResponseMessage.UNAUTHORIZED
          )
        );
    }
    //tra jwt cho FE
    let token = AuthController.generateToken({
      username: user.username,
      hashed: pwdInDb,
    });
    res.json(
      new BaseResponse(ResponseCode.SUCCESSFUL, ResponseMessage.SUCCESSFUL)
    );
  },
  generateToken: (data) => {
    try {
      return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRED_IN,
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  restrictTo: (...roles) => {
    //Arguments object
    return (req, res, next) => {
      try {
        if (!roles.includes(req.user.role)) {
          return res
            .status(403)
            .json(
              new BaseResponse(
                ResponseCode.FORBIDDEN,
                ResponseMessage.FORBIDDEN
              )
            );
        }
        next();
      } catch (error) {
        console.log(error);
      }
    };
  },
};
module.exports = AuthController;
