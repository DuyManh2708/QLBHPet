var express = require("express");
const RenderController = require("../controllers/render.controller");
var router = express.Router();

/* GET home page. */
router.get("/", RenderController.home);
router.get("/signin", RenderController.signIn);
router.get("/contact", RenderController.contact);
router.get("/menu", RenderController.menu);
router.get("/menuleft", RenderController.menuleft);
router.get("/homepage", RenderController.homepage);
router.get("/dog", RenderController.dog);
router.get("/cat", RenderController.cat);
module.exports = router;
