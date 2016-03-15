'use strict';
var categoryRouter = require('express').Router();
var catCtrl = require('./categories.controller');

categoryRouter.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

categoryRouter.route('/categories')
  .get(function(req, res){
    catCtrl.getCategories(req, res);
  })
  .post(function(req, res){
    catCtrl.createCategory(req, res);
  })
  .put(function(req, res){
    catCtrl.updateCategory(req, res);
  });

categoryRouter.route('/categories/:id')
  .delete(function(req, res){
    catCtrl.deleteCategory(req, res);
  });

module.exports = categoryRouter;
