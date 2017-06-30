'use strict';

const express = require('express');
const app = express();
const path = require('path')
const govukTemplate = require('hof-govuk-template');
const hoganExpressStrict = require('hogan-express-strict');
const expressPartialTemplates = require('express-partial-templates');
const _ = require('lodash');
const smartSurveyAPICall = require('./lib/smartSurveyAPICall');
const config = require('./config');

govukTemplate.setup(app);
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, 'app/views'))
app.engine('html', hoganExpressStrict);
app.use(expressPartialTemplates(app));

app.use('public', express.static(path.resolve(__dirname, 'public')))

app.get('/', function(req, res, next){
  res.render('home', _.merge({}, res.locals, {
  }))
})

app.get('/responses', function(req, res, next){
  res.json(smartSurveyAPICall.getData(config.apiToken, config.apiTokenSecret, config.surveyID, smartSurveyAPICall.parseResponse))
})

app.listen(4000, function() {
  console.log('App on port 4000')
})
