'use strict';

const helper = require('../../lib/helper');

describe('lib/helper', () => {
  it('pageRemaining is a function', () => {
    helper.pageRemaining.should.be.a('function');
  });
});
