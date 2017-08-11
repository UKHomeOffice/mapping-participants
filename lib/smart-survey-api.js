'use strict';

const SmartSurveyClient = require('smartsurvey-client');

const createClient = (token, tokenSecret) => new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret});

module.exports = {
  getData: (token, tokenSecret, surveyID) => {
    const client = createClient(token, tokenSecret);
    // convert the function into a promise
    return new Promise((resolve, reject) => {
      client.getResponses(surveyID, {page: 1, pageSize: 25, includeLabels: true}, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};
