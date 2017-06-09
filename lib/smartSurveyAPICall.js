'use strict';

const axios = require('axios');
const querystring = require('querystring');
const SmartSurveyClient = require('smartsurvey-client')

module.exports = {
  getResponses: (baseUrl, surveyID, endPoint, token, tokenSecret) => {
    querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
    const apiUrlPart = querystring.stringify({'api_token':token, 'api_token_secret': tokenSecret});
    axios.get(`${baseUrl}/${surveyID}/${endPoint}?${apiUrlPart}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  createClient: (token, tokenSecret) => {
    return client = new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret})
  },
  getData: (token, tokenSecret, surveyID) => {
    let client = new SmartSurveyClient({ apiToken: token, apiTokenSecret: tokenSecret})
    client.getResponses(surveyID, { page: 1, pageSize: 25, includeLabels: false},
      function (err, result) {
        if (err) {
          console.log(err)
        }
        else {
          const prettyResult = JSON.stringify(result, null, 2);
          console.log(prettyResult);
        }
      })

  }
  // need to deal with errors like 400, blah, as per above
  // logging out for now

};
