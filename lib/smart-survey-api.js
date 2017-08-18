'use strict';

const SmartSurveyClient = require('smartsurvey-client');
const config = require('../config');

const createClient = (token, tokenSecret) => new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret});

module.exports = class smartSurvey {
  // Tip: When you have lots of parameters it's better to pass in an object and read from that
  // In order to disable an eslint next line, you pass in eslint-disable-next-line with the name of the rule
  // eslint-disable-next-line max-params
  getData(options, pageOptions) {
    const client = createClient(options.token, options.tokenSecret);

    if (pageOptions === undefined) {
      pageOptions = {
        page: config.page,
        pageSize: config.pageSize,
        includeLabels: config.includeLabels
      };
    }

    // convert the function into a promise
    return new Promise((resolve, reject) => {
      client.getResponses(options.surveyID, pageOptions, (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          });
    });
  }
};
