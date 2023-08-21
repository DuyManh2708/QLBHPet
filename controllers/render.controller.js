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
      res.render(Constant.viewVersion + "/auth/SignIn");
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
  error: (req, res, next) => {},
};
module.exports = RenderController;
