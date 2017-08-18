'use strict';

const express = require('express');
const app = express();
const path = require('path');
const govukTemplate = require('hof-govuk-template');
const hoganExpressStrict = require('hogan-express-strict');
const expressPartialTemplates = require('express-partial-templates');
const _ = require('lodash');
const SmartSurveyAPIBase = require('./lib/smart-survey-api');
const smartSurveyAPI = new SmartSurveyAPIBase();
const config = require('./config');
const port = config.port;

govukTemplate.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'app/views'));
app.engine('html', hoganExpressStrict);
app.use(expressPartialTemplates(app));

app.use('public', express.static(path.resolve(__dirname, 'public')));

app.get('/', function get(req, res) {
  res.render('home', _.merge({}, res.locals, {
  }));
});

app.get('/responses', function get(req, res) {
  const options = {
    token: config.apiToken,
    tokenSecret: config.apiTokenSecret,
    surveyID: config.surveyID
  };

  return smartSurveyAPI.getData(options)
    .then(results => res.json(results))
    // This is a placeholder for error logging. In the future, the aim
    // is to print a friendly message to the user with the stacktrace
    // eslint-disable-next-line no-console
    .catch(error => console.log(error));
});

app.listen(port, function listen() {
  // eslint-disable-next-line no-console
  console.log(`App on port ${port}`);
});
