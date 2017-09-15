'use strict';
const _ = require('lodash');

module.exports = {
  format: (data, pickedItems, scoreId, agreeId) => {
    let list = [];

    // _.map iterates over a collection
    _.map(data, (item) => {
      // _.pick picks out the items from a collection
      let obj = _.pick(item, pickedItems);
      _.map(item.pages, (page) => {
        if (page.id === 1306410) {
          _.map(page.questions, (question) => {
            // this id is related to the participant score
            if (question.id === scoreId) {
              obj.score = question.answers[0].value;
            }
            // this id is related to User researcher agreeing with the score
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
