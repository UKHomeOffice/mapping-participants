'use strict';

const axios = require('axios');
const querystring = require('querystring');

module.exports = {
  getResponses: (baseUrl, surveyID, endPoint, apiToken, apiTokenSecret) => {
    querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
    const apiUrlPart = querystring.stringify({'api_token':apiToken, 'api_token_secret': apiTokenSecret});
    axios.get(`${baseUrl}/${surveyID}/${endPoint}?${apiUrlPart}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // need to deal with errors like 400, blah, as per above
  // logging out for now

};
