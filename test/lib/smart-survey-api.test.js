'use strict';

const sinon = require('sinon');
const chai = require('chai').use(require('sinon-chai'));
const proxyquire = require('proxyquire');
chai.should();
chai.use(require('chai-as-promised'));

let getResponsesStub = sinon.stub();

// create an empty function for the stub because there is a constructor in the library
// don't use arrow functions for that reason
const smartSurveyStub = function() {
    return {getResponses: getResponsesStub};
};
// Proxyquire syntax: first argument: point to your module (which holds your dependency)
// 2nd argument: An object with the key: module name to proxy & the value the object above
// So this means smartSurveyStub will now point to this function, i.e. a stub
const smartSurveyAPI = proxyquire('../../lib/smart-survey-api', { 'smartsurvey-client': smartSurveyStub});

describe('smartSurveyAPI', () => {
  describe('getData()', () => {
    it('is a function', () => (typeof smartSurveyAPI.getData).should.equal('function'));
    // it('is takes 3 arguments', () => (typeof smartSurveyAPI.getData).should.have.lengthOf(3));
    describe('when HAPPYPATH', () => {
      let result;
      const response = {foo: 'bar'};

      before(() => {
        getResponsesStub
          .withArgs('survey1', sinon.match.any)
          .yields(null, response);
        result = smartSurveyAPI.getData('mytoken', 'mytokensecret', 'survey1');
      });

      after(() => {
        getResponsesStub.reset();
      });

      it('returns a Promise', () => result.should.be.a('Promise'));
      it('resolves', () => result.should.eventually.be.fulfilled);
      it('that resolves to the response', () => result.should.eventually.equal(response));
  });
    describe('when NOT HAPPYPATH', () => {
      let result;
      const error = 'some error';
      before(() => {
        getResponsesStub
          .withArgs('noSurveyId', sinon.match.any)
          .yields(error, null);
        result = smartSurveyAPI.getData('mytoken', 'mytokensecret', 'noSurveyId');
      });
      after(() => {
        getResponsesStub.reset();
      });
      it('returns a Promise', () => result.should.be.a('Promise'));
      it('rejects', () => result.should.eventually.be.rejected);
      it('that rejects to the error', () => result.should.be.rejectedWith(error));
    });
  });
});
