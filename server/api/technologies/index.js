'use strict';
var techRouter = require('express').Router();
var techCtrl = require('./technologies.controller');

/**
 * @description Middleware that intercepts all incoming
 * requests, if there is an id in the request, then
 * the Middleware attaches the id to the request.body
 * @param  ObjectId 'id' Its the technology's id
 * @param  Anonymous function the params are provided by express,
 * the last param is the ObjectId
 */
techRouter.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

/**
 * @name /technologies
 * @description Its the main technologies API route
 * it GETS PUTS and POSTS technologies
 */
techRouter.route('/technologies')
  .get(function(req, res){
    techCtrl.getTechnologies(req, res);
  })
  .post(function(req, res){
    techCtrl.createTech(req, res);
  })
  .put(function(req, res){
    techCtrl.updateTech(req, res);
  });

  techRouter.route('/technologies_by_category/:id')
    .get(function(req, res){
      techCtrl.getTechnologiesByCategory(req, res);
    })

/**
 * @name /technologies/:id
 * @description This API route is used for providing
 * services of the technologies that need to have an id
 * as a parameter
 * @param  ObjectId '/:id' Its the technology's id
 */
techRouter.route('/technologies/:id')
  .get(function(req, res){
    techCtrl.getTechById(req, res);
  })
  .delete(function(req, res){
    techCtrl.deleteTech(req, res);
  });

/**
 * @name /technologies/questions:id
 * @description This API route provides services of the
 * questions related to a specific technology.
 * GETs PUTs POSTs and DELETEs
 * @param  ObjectId 'questions/:id' Its the technology's id
 */
techRouter.route('/technologies/questions/:id')
  .get(function(req, res){
    techCtrl.getQuestions(req, res);
  })
  .post(function(req, res){
    techCtrl.createQuestions(req, res);
  })
  .put(function(req, res){
    techCtrl.updateQuestions(req, res);
  });

techRouter.route('/technologies/questions')
  .put(function(req, res){
    techCtrl.deleteQuestions(req, res);
  });

module.exports = techRouter;
