'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TechnologySchema = new mongoose.Schema({

  name : {
    type : String,
    required : true
  },
  category : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  questions : [{
    level : {
      type : String
    },
    question : {
      type : String
    },
    answer : {
      type : String
    }
  }]
});

export default mongoose.model('Technology', TechnologySchema);
