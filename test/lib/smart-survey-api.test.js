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
          // .catch(err => console.log(err));
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

// describe('smartSurveyAPI', function() {
//   let sandbox;
//   beforeEach(function beforeEach() {
//     // sandboxes removes the need to keep track of every mock created & cleaning
//     sandbox = sinon.sandbox.create();
//     // stub out the createClient method which returns a new SmartSurveyClient instance 
//     // with a function getResponses that has a stub
//     sandbox.stub(smartSurveyAPI, 'createClient').returns({
//       getResponses: sandbox.stub()
//     });
//     // sandbox.stub(smartSurveyAPI, 'getResponses').yields(null, 'test');
//   });

//   afterEach(function afterEach() {
//     sandbox.restore();
//   });
//   describe('#createClient', function() {
//     it('calls createClient with token and secret', function() {
//       smartSurveyAPI.getData('mytoken', 'somesecret', 'id');
//       smartSurveyAPI.createClient.should.have.been
//         .calledWith('mytoken', 'somesecret');
//     });
//   });

//   describe('#getResponses', function() {
//     it('calls getResponses with id and {page: 1, pageSize: 25, includeLabels: true}', function() {
//       smartSurveyAPI.getData('mytoken', 'mysecret', 'id');
//       smartSurveyAPI.getResponses.should.have.been
//         .calledWith('id', {page: 1, pageSize: 25, includeLabels: true});
//     });
//   });
// });
  // describe('smartSurveyClientWithPromises', function() {
    // const token = 'a';
    // const tokenSecret = 'b';
    // const surveyID = 1;

    // let stub = sinon.stub(stubSmartSurvey.prototype, 'getResponses').yields(null, 'test');
    // smartSurveyClientAPI.getData(token, tokenSecret, surveyID);
    // it('getResponses should have been called with the correct
    // params', function() {stubSmartSurvey.prototype.getResponses.
    // should.have.been.calledWith(1, {page: 1, pageSize: 25, includeLabels: true});
    //   stub.restore;
    // });
