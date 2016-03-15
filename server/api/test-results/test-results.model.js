'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TestResultSchema = new mongoose.Schema({

  name : {
    type: String,
    required : true
  },
  lastName :{
    type: String,
    required : true
  },
  identification : {
    type: String,
    required : true
  },
  phoneNumber : String,
  email : {
    type: String,
    required : true
  },
  placeOfStudy: String,
  studyLevel: String,
  technicalSkills : [],
  englishLevel : {
    type: String,
    required : true
  },
  technicalComment : String
  // evaluator : {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true
  // }

});

export default mongoose.model('TestResult', TestResultSchema);
