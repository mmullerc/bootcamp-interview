'use strict';
var _ = require('lodash');
var Technology = require('./technologies.model');
var mongoose = require('mongoose');

module.exports.getTechnologies = function(req, res){

  Technology.find()
  .sort({name: 'ascending'})
  .populate('category')
  .exec()
  .then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.getTechnologiesByCategory = function(req, res){

  Technology.find({'category' : req.body.id})
  .sort({name: 'ascending'})
  .populate('category')
  .exec()
  .then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.createTech = function(req, res){

  Technology.create(req.body).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.updateTech = function(req, res){

  var id = req.body._id;
  var tech = {
    name : req.body.name,
    category : req.body.category
  }
  console.log(tech);
  Technology.findByIdAndUpdate(id, tech).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.getTechById = function(req, res){

  Technology.findById(req.body.id).then(function(results){
    console.log(results);
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.deleteTech = function(req, res){

  Technology.findByIdAndRemove(req.body.id).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.createQuestions = function(req, res){

  var id = req.body._id;

  Technology.findByIdAndUpdate(id,
    {$pushAll: {questions:[req.body.questions]}},
    {safe: true, new: true})
    .then(function(results){
      Technology.findById(req.body.id).then(function(result){
        res.send(result);
      }).catch(function(err) {
        errorHandler(err, res);
      })
    }).catch(function(err) {
      errorHandler(err, res);
    })
};


module.exports.deleteQuestions = function(req, res){

  Technology.update({},
    {$pull: { questions : { question : req.body.questions.question} } },{ multi: true })
    .then(function(results){
      Technology.findById(req.body.id).then(function(result){
        res.send(result);
      }).catch(function(err) {
        errorHandler(err, res);
      })
    }).catch(function(err) {
      errorHandler(err, res);
    })
};


function errorHandler(err, res){
  console.log('Server Error');
  res.send(err);
}
