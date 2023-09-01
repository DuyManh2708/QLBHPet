const Constant = require("../constans/constan");
const RenderController = {
  home: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/index");
    } catch (error) {
      console.log(error);
    }
  },
  listsProduct: (req, res, next) => {},
  findProduct: (req, res, next) => {},
  createProduct: (req, res, next) => {},
  editProduct: (req, res, next) => {},
  deleteProduct: (req, res, next) => {},

  signIn: (req, res, next) => {
    try {
      console.log(Constant.viewVersion);
      res.render(Constant.viewVersion + "/auth/signin");
    } catch (error) {
      console.log(error);
    }
  },
  contact: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/pages/contacts");
    } catch (error) {
      console.log(error);
    }
  },
  menu: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/layout/menu");
    } catch (error) {
      console.log(error);
    }
  },
  menuleft: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/layout/menuleft");
    } catch (error) {
      console.log(error);
    }
  },
  homepage: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/client/homepage");
    } catch (error) {
      console.log(error);
    }
  },
  dog: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/client/dog");
    } catch (error) {
      console.log(error);
    }
  },
  cat: (req, res, next) => {
    try {
      res.render(Constant.viewVersion + "/client/cat");
    } catch (error) {
      console.log(error);
    }
  },
  error: (req, res, next) => {},
};
module.exports = RenderController;
