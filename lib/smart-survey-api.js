'use strict';

const SmartSurveyClient = require('smartsurvey-client');

module.exports = {
  createClient: function creatSmartSurveyClient(token, tokenSecret) {
    this.client = new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret});
  },
  getData: function getDataSmartSurveyClient(token, tokenSecret, surveyID, callback) {
    this.createClient(token, tokenSecret);
    this.client.getResponses(surveyID, { page: 1, pageSize: 25, includeLabels: false}, callback);
  },
  parseResponse: (err, result) => {
    if (err) {
      return err;
    }

    const prettyResult = JSON.stringify(result, null, 2);
    return prettyResult;
  }
};
