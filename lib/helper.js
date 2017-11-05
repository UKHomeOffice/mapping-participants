'use strict';
const surveyApi = require('./smart-survey-api');
const config = require('../config');
const _ = require('lodash');

module.exports = {
  // works out how many more calls to make to the API
  callsRemaining: (data) => {
  const pageVal = (data.meta.pagination.total - data.meta.pagination.returned) / data.meta.pagination.pageSize;

    if (pageVal < 1 && pageVal > 0) {
      return 1;
    } else if (pageVal % 1 !== 0) {
      return Math.trunc(pageVal) + 1;
    }
    return pageVal;
  },

  getMergedData: (calls, data) => {
    if (calls > 0) {
      let mergedData = {};
      let page = 2;
      for (let i = 1; i <= calls; i++) {
        const format = {page: page, pageSize: config.pageSize, includeLabels: config.includeLabels};
        const pageData = surveyApi.getData(format);
        mergedData = _.merge(mergedData, pageData);
        page++;
      }
      mergedData = _.merge(mergedData, data);
      return mergedData;
    }
  }
};
