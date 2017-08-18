'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  apiToken: process.env.API_TOKEN,
  apiTokenSecret: process.env.API_TOKEN_SECRET,
  apiBaseUrl: process.env.BASE_URL || 'https://api.smartsurvey.io/v1/surveys',
  surveyID: process.env.SURVEY_ID || '339109',
  endPointResponses: 'responses',
  port: process.env.PORT || '4000',
  page: process.env.PAGE || 1,
  pageSize: process.env.PAGE_SIZE || 25,
  includeLabels: process.env.INCLUDE_LABELS || true
};
