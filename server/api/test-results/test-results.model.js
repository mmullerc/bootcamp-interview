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
  technicalComment : String,
  evaluatorName : {
    type: String,
    required : true
  },
  evaluatorLastName : {
    type: String,
    required : true
  },
  evaluatorEmail : {
    type: String,
    required : true
  }

});

export default mongoose.model('TestResult', TestResultSchema);
