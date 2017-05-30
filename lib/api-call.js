'use strict';

const axios = require('axios');
const config = require('./../config');
const baseUrl = config.apiBaseUrl;
const surveyID = config.surveyID;
const responses = config.endPointResponses;
const apiToken = config.apiToken;
const apiTokenSecret = config.apiTokenSecret;

module.exports = {
  getResponses: function() {
    axios.get(baseUrl + '/' + surveyID + '/' + responses + '?api_token=' + config.apiToken + '&api_token_secret=' + config.apiTokenSecret)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
