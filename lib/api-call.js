'use strict';

const axios = require('axios');

module.exports = {
  getResponses: function(baseUrl, surveyID, endPoint, apiToken, apiTokenSecret) {
    axios.get(baseUrl + '/' + surveyID + '/' + endPoint + '?api_token=' + apiToken + '&api_token_secret=' + apiTokenSecret)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
