'use strict';

const proxyquire = require('proxyquire');
let getResponsesStub = sinon.stub();

// create an empty function for the stub because there is a constructor in the library
// don't use arrow functions for that reason
const smartSurveyStub = function() {
    return {getResponses: getResponsesStub};
};
// Proxyquire syntax:
// first argument: points to your module (which holds your dependency)
// 2nd argument: An object. The object has a key that is the name of the moduleof the dependency
// & the value the object above of the proxy
// So this means smartSurveyStub will now point to this function, i.e. a stub
const SurveyApi = proxyquire('../../lib/smart-survey-api', { 'smartsurvey-client': smartSurveyStub});

describe('SurveyApi', () => {
  describe('getData()', () => {
    it('is a function', () => (typeof SurveyApi.getData).should.equal('function'));
    it('takes 0 mandatory argument', () => (SurveyApi.getData).should.have.lengthOf(0));

    describe('when smartSurvey responds without errors', () => {
      let result;
      const response = {foo: 'bar'};

      before(() => {
        getResponsesStub
          .withArgs('survey1', sinon.match.any)
          .yields(null, response);
        result = SurveyApi.getData({surveyID: 'survey1'});
      });

      after(() => {
        getResponsesStub.reset();
      });

      it('returns a Promise', () => result.should.be.a('Promise'));
      it('resolves', () => result.should.eventually.be.fulfilled);
      it('that resolves to the response', () => result.should.eventually.equal(response));
    });
    describe('when SmartSurvey returns an error', () => {
      let result;
      const error = 'some error';
      before(() => {
        getResponsesStub
          .withArgs('noSurveyId', sinon.match.any)
          .yields(error, null);
        result = SurveyApi.getData({surveyID: 'noSurveyId'});
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
