/**
 * User Schema
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required : true
  },
  name:{
    type:String,
    required: true
  },
  lastName:{
    type:String,
    required: true
  },
  hash:String,
  salt:String

});

/**
 * @name setPassword
 */
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
}

/**
 *@name validPassword
 */
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
  console.log(hash);
  return this.hash === hash;
}
/**
 * @name generateJwt
 */
userSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email : this.email,
    name : this.name,
    lastName : this.lastName,
    exp : parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};
module.exports = mongoose.model('User', userSchema);
