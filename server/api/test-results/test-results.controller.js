'use strict';
var _ = require('lodash');
var TestResult = require('./test-results.model');
var mongoose = require('mongoose');
var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
var fs = require('fs');

module.exports.getTests = function(req, res){

  TestResult.find().then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.createTestResults = function(req, res){

  TestResult.create(req.body).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

module.exports.generatePDF = function(req, res){

  // doc = new PDFDocument
  //
  // doc.pipe fs.createWriteStream('output.pdf')
  //
  // doc.font('fonts/PalatinoBold.ttf')
  //    .fontSize(25)
  //    .text('Some text with an embedded font!', 100, 100)
  //
  // doc.addPage()
  //    .fontSize(25)
  //    .text('Here is some vector graphics...', 100, 100)
  //
  // doc.save()
  //    .moveTo(100, 150)
  //    .lineTo(100, 250)
  //    .lineTo(200, 250)
  //    .fill("#FF3300")
  //
  // doc.scale(0.6)
  //    .translate(470, -380)
  //    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  //    .fill('red', 'even-odd')
  //    .restore()
  //
  // doc.addPage()
  //    .fillColor("blue")
  //    .text('Here is a link!', 100, 100)
  //    .underline(100, 100, 160, 27, color: "#0000FF")
  //    .link(100, 100, 160, 27, 'http://google.com/')
  //
  // doc.end()

};

module.exports.deleteTestResults = function(req, res){

  Technology.findByIdAndRemove(req.body.id).then(function(results){
    res.send(results);
  }).catch(function(err) {
    errorHandler(err, res);
  })
};

function errorHandler(err, res){
  console.log('Server Error');
  res.send(err);
}
