'use strict';

const axios = require('axios');
const querystring = require('querystring');
const SmartSurveyClient = require('smartsurvey-client');

module.exports = {
  getResponses: (baseUrl, surveyID, endPoint, token, tokenSecret) => {
    querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
    const apiUrlPart = querystring.stringify({'api_token': token, 'api_token_secret': tokenSecret});
    axios.get(`${baseUrl}/${surveyID}/${endPoint}?${apiUrlPart}`)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  },

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
