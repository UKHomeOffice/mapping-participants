'use strict';

const helper = require('../../lib/helper');

describe('lib/helper', () => {
  describe('callsRemaining', () => {
    it('is a function', () => {
      helper.callsRemaining.should.be.a('function');
    });

    it('evaluates to 1 call remaining when there are 32 pages', () => {
      const pages = {
          'meta': {
          'pagination': {
            'page': '1',
            'pageSize': '25',
            'returned': '25',
            'total': '32'
          }
        }
      };

      const pageLeft = helper.callsRemaining(pages);
      (pageLeft).should.equal(1);
    });
    it('evaluates to 2 calls remaining when there are 52 pages', () => {
      const pages = {
          'meta': {
          'pagination': {
            'page': '1',
            'pageSize': '25',
            'returned': '25',
            'total': '52'
          }
        }
      };

      const pageLeft = helper.callsRemaining(pages);
      (pageLeft).should.equal(2);
    });

    it('evaluates to 0 calls remaining when there are 0 pages', () => {
      const pages = {
          'meta': {
          'pagination': {
            'page': '1',
            'pageSize': '25',
            'returned': '0',
            'total': '0'
          }
        }
      };

      const pageLeft = helper.callsRemaining(pages);
      (pageLeft).should.equal(0);
    });

    it('evaluates to 0 calls remaining when there are 1 pages', () => {
      const pages = {
          'meta': {
          'pagination': {
            'page': '1',
            'pageSize': '25',
            'returned': '1',
            'total': '1'
          }
        }
      };

      const pageLeft = helper.callsRemaining(pages);
      (pageLeft).should.equal(0);
    });

  });
});
