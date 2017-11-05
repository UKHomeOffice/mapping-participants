'use strict';

const express = require('express');
const app = express();
const path = require('path');
const govukTemplate = require('hof-govuk-template');
const hoganExpressStrict = require('hogan-express-strict');
const expressPartialTemplates = require('express-partial-templates');
const _ = require('lodash');
const config = require('./config');
const surveyApi = require('./lib/smart-survey-api');
const transform = require('./lib/transform');
const helper = require('./lib/helper');
const testData = require('./test/test-data');

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

// (req, res) is passed in because of the way express works
const surveyMiddleware = (req, res) => {
  surveyApi.getData()
    // .then(results => res.json(results))
    .then(results => {
      const calls = helper.callsRemaining(results);
      const mergedData = helper.getMergedData(calls, results);
      const stuff = transform.format(mergedData.data, ['id', 'tracking_link_id', 'status'], config.pageId, config.scoreId, config.agreeId);
      // console.log('mergedData', mergedData);
    })
    // This is a placeholder for error logging. In the future, the aim
    // is to print a friendly message to the user with the stacktrace
    // eslint-disable-next-line no-console
    .catch(console.log);
};

app.get('/responses', surveyMiddleware);

app.listen(port, () => {
  // In order to disable an eslint next line, you pass in eslint-disable-next-line with the name of the rule
  // eslint-disable-next-line no-console
  console.log(`App on port ${port}`);
  // const stuff = transform.format(testData.data, ['id', 'tracking_link_id', 'status'], config.pageId, config.scoreId, config.agreeId);

});
