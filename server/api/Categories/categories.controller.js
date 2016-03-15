'use strict';

import _ from 'lodash';
import Category from './category.model';
import mongoose from 'mongoose';
/**
 * [function description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports.getCategories = function(req, res){

  Category.find().then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};
/**
 * [function description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports.createCategory = function(req, res){

  Category.create(req.body.category).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};
/**
 * [function description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports.deleteCategory = function(req, res){

  Category.findByIdAndRemove(req.body.id).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};
/**
 * [function description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports.updateCategory = function(req, res){

  var id = req.body._id;
  var cat = {
    category : req.body.category,
  }

  Category.findByIdAndUpdate(id, cat).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};
//HELPER FUNCTIONS
function errorHandler(err, res){
  console.log('Server Error');
  console.log(err);
  res.send(err);
}
