'use strict';

const express = require('express');
const app = express();
const path = require('path')// mustache govuk template
const govukTemplate = require('hof-govuk-template');
const hoganExpressStrict = require('hogan-express-strict');// Allows the use of partials
const expressPartialTemplates = require('express-partial-templates');

govukTemplate.setup(app);
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, 'views'))
app.engine('html', hoganExpressStrict);
app.use(expressPartialTemplates(app));

app.use('public', express.static(path.resolve(__dirname, 'public')))

app.listen(3000, function() {
  console.log('App on port 3000')
})