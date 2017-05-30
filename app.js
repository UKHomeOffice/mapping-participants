'use strict';

const express = require('express');
const app = express();
const path = require('path')
const govukTemplate = require('hof-govuk-template');
const hoganExpressStrict = require('hogan-express-strict');
const expressPartialTemplates = require('express-partial-templates');
const _ = require('lodash');
const apiCall = require('./lib/api-call');
const config = require('./config');
const baseUrl = config.apiBaseUrl;
const surveyID = config.surveyID;
const responses = config.endPointResponses;
const apiToken = config.apiToken;
const apiTokenSecret = config.apiTokenSecret;

govukTemplate.setup(app);
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, 'app/views'))
app.engine('html', hoganExpressStrict);
app.use(expressPartialTemplates(app));

app.use('public', express.static(path.resolve(__dirname, 'public')))

apiCall.getResponses(baseUrl, surveyID, responses, apiToken, apiTokenSecret);

app.get('/', function(req, res, next){
  res.render('home', _.merge({}, res.locals, {
  }))
})

app.listen(4000, function() {
  console.log('App on port 4000')
})
