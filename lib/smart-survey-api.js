'use strict';

const SmartSurveyClient = require('smartsurvey-client');
const Promise = require("bluebird");

module.exports = {
  createClient: function creatSmartSurveyClient(token, tokenSecret) {
    this.client = new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret});
  },
  getData: function getDataSmartSurveyClient(token, tokenSecret, surveyID) {
    this.createClient(token, tokenSecret);
    return new Promise((resolve,reject) => {
      this.client.getResponses(surveyID, {page: 1, pageSize: 25, includeLabels: true}, (error, result) => {
        if(error) {
          return reject(error)
        }
        return resolve(result)
      });
    })
  },
  refromatResponse: (result) => {
    return result;
  }
};
