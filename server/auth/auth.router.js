var authRouter = require('express').Router();
var authCtrl = require('./auth.controller');

var jwt = require('express-jwt'),
  auth = jwt({
    secret : process.env.JWT_SECRET,
    userProperty : 'payload'
  });

authRouter.post('/register', authCtrl.register);
authRouter.post('/login', authCtrl.login);

module.exports = authRouter;
