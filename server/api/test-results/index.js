'use strict';
var testResultRouter = require('express').Router();
var testResultCtrl = require('./test-results.controller');
var handlebars = require('handlebars');
var _ = require('lodash');

/**
 * @description Middleware that intercepts all incoming
 * requests, if there is an id in the request, then
 * the Middleware attaches the id to the request.body
 * @param  ObjectId 'id' Its the technology's id
 * @param  Anonymous function the params are provided by express,
 * the last param is the ObjectId
 */
testResultRouter.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

/**
 * @name /testResults
 * @description Its the main tests API route
 */
testResultRouter.route('/testResults')
  .get(function(req, res){
    testResultCtrl.getTests(req, res);
  })
  .post(function(req, res){
    testResultCtrl.createTestResults(req, res);
  });
  
  testResultRouter.route('/testResults/generatePDF')
    .post(function(req, res){
      var techSkills = req.body.technicalSkills;
    // var tmpl =  _.template('<ul><% _.forEach(techSkills, function(tech) { %><li><%- tech.name %></li><li><%- tech.level %></li><% }); %></ul>');
    // tmpl({'techSkills':techSkills});

    var tmpl = '';
    for (var i = 0; i < techSkills.length; i++) {
      tmpl += '<li style="color:#00796b">'+techSkills[i].technology+ ' - ' + techSkills[i].level+' </li>';
    }

      var htmlReport = '<h1 style="color:#00796b;">Test Results</h1>' +
                       '<hr>' +
                       '<b><h3>Name: '+req.body.name + ' ' + req.body.lastName +'</h3></b>' +
                       '<hr>' +
                       '<h3 style="color:#00796b">Personal Information: </h3>' +
                       '<h3>Id: '+req.body.identification+'</h3>' +
                       '<h3>Email: '+req.body.email+'</h3>' +
                       '<h3>Phone Number: '+req.body.phoneNumber+'</h3>' +
                       '<h3>Study Level: '+req.body.studyLevel+'</h3>' +
                       '<h3>Place of Study: '+req.body.placeOfStudy+'</h3>' +
                       '<hr>' +
                       '<h2 style="color:#00796b">Technical Skills:' +
                       '<br>'+
                       '<h3>Technologies:'+'<ul style="list-style:none;">'+''+tmpl+'</ul>'+
                       '<hr>' +
                       '<h3>English Level: '+req.body.englishLevel+'</h3>' +
                       '<hr>' +
                       '<h3>Technical Comment: '+req.body.technicalComment+'</h3>';


      var jsreport = require('jsreport');
      jsreport.render(htmlReport).then(function(out) {
        out.stream.pipe(res);
      }).catch(function(e) {
        res.end(e.message);
      });
    });

  testResultRouter.route('/testResults/:id')
    .get(function(req, res){
      testResultCtrl.getTestResultsById(req, res);
    })
    .delete(function(req, res){
      testResultCtrl.deleteTestResults(req, res);
    });

module.exports = testResultRouter;
