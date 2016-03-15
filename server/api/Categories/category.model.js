'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CategorySchema = new mongoose.Schema({
  category : {
    type : String,
    required : true
  }
});

export default mongoose.model('Category', CategorySchema);
