'use strict';
const _ = require('lodash');

module.exports = {
  format: (data, pickedItems, pageID, scoreId, agreeId) => {
    let list = [];

    // _.map iterates over a collection
    _.map(data, (item) => {
      // _.pick picks out the items from a collection
      let obj = _.pick(item, pickedItems);
      _.map(item.pages, (page) => {
        // Page id holds the data related to the information we want
        // Note: page here is NOT related to the pages returned for the API
        if (page.id === pageID) {
          _.map(page.questions, (question) => {
            // Question id is related to the participant score
            if (question.id === scoreId) {
              obj.score = question.answers[0].value;
            }
            // Agree id is related to User researcher agreeing with the score
            if (question.id === agreeId) {
              obj['agree-score'] = question.answers[0].choice_title;
            }
          });
        }
      });
      list.push(obj);
    });
    console.log('list', list);
    return list;

  }
};
