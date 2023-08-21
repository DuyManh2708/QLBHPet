var express = require('express');
const RenderController = require('../controllers/render.controller');
var router = express.Router();

/* GET home page. */
router.get('/', RenderController.home) ;
router.get('/signin', RenderController.signIn);
router.get('/contact', RenderController.contact);
module.exports = router;
