'use strict';
var usersRouter = require('express').Router();
var userCtrl = require('./users.controller');

usersRouter.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

usersRouter.route('/users')
  .get(function(req, res){
    userCtrl.getUsers(req, res);
  })

usersRouter.route('/users/:id')
  .delete(function(req, res){
    userCtrl.deleteUser(req, res);
  });

module.exports = usersRouter;
