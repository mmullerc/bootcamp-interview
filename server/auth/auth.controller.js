var passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res) {

  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
    passport.authenticate('local', function(err, user, info) {
      var token;
      if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }
      if (user) {
        token = user.generateJwt();
        sendJSONresponse(res, 200, {
          "token": token
        });
      } else {
        sendJSONresponse(res, 401, info);
      }
    })(req, res);
  };

module.exports.register = function(req, res) {

  console.log(req.body);

  if (!req.body.name || !req.body.lastName || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  var user = new User();
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    }
  });
};
