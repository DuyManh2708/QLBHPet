var express = require('express');
const ErrorController = require('../controllers/errors.controller');
const AuthController = require('../controllers/auth.controller');
const restrictTo = require('../middleware/auth.middleware');
const EmailController = require('../controllers/email.controller')
var router = express.Router();

//Router-level Middleware
router.param('uid', (req, res, next)=>{
  console.log('req.query:', req.query);
  console.log('req.params:', req.params);
  next();
});

router.route('/auth/SignIn').post(AuthController.signIn);
router.route('/sendEmail').post(EmailController.send);
router.route('*').all(ErrorController.pathNotFound);

module.exports = router;
