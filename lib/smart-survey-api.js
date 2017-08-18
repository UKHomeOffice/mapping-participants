'use strict';

const SmartSurveyClient = require('smartsurvey-client');
const config = require('../config');

const createClient = (token, tokenSecret) => new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret});

module.exports = class smartSurvey {
  constructor(token, tokenSecret) {
    this.token = token;
    this.tokenSecret = tokenSecret;
    this.client = createClient(token, tokenSecret);
  }

  // Tip: When you have lots of parameters it's better to pass in an object and read from that
  // In order to disable an eslint next line, you pass in eslint-disable-next-line with the name of the rule
  // eslint-disable-next-line max-params
  getData(surveyID, pageOptions = {}) {
    // const client = createClient(options.token, options.tokenSecret);

    pageOptions = Object.assign({
      page: config.page,
      pageSize: config.pageSize,
      includeLabels: config.includeLabels
    }, pageOptions);

    // convert the function into a promise
    return new Promise((resolve, reject) => {
      this.client.getResponses(surveyID, pageOptions, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  }
};
