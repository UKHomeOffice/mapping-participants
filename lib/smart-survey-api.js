'use strict';

const SmartSurveyClient = require('smartsurvey-client');
const config = require('../config');

const createClient = (token, tokenSecret) => new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret});

module.exports = {
  // Tip: When you have lots of parameters it's better to pass in an object and read from that
  getData: (options = {}, format = {}) => {
    // The Object.assign() method is used to copy the values of all enumerable own properties 
    // from one or more source objects to a target object. It will return the target object.
    format = Object.assign({
      page: config.page,
      pageSize: config.pageSize,
      includeLabels: config.includeLabels
    }, format);
    options = Object.assign({
      token: config.apiToken,
      tokenSecret: config.apiTokenSecret,
      surveyID: config.surveyID
    }, options);

    const client = createClient(options.token, options.tokenSecret);

    // convert the function into a promise
    return new Promise((resolve, reject) => {
      client.getResponses(options.surveyID, format, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  }
};
