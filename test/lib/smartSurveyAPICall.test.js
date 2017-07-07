'use strict';

const sinon = require('sinon');  
const chai = require('chai').use(require('sinon-chai'));
const should = chai.should();
const proxyquire = require('proxyquire');
let stubAxios = {};

// Proxyquire syntax: first argument: point to your module (which holds your dependency)
// 2nd argument: An object with the key: module name to proxy & the value the empty object above
// So this means smartSurveyAxiosAPI will now point to this empty object, i.e. a stub
const smartSurveyAxiosAPI = proxyquire('../../lib/smartSurveyAPICall', {
  'axios': stubAxios,
});

// create an empty function using not using arrow functions because using context
var stubSmartSurvey = function() {
}
var smartSurveyClientAPI = proxyquire('../../lib/smartSurveyAPICall', {
  'smartsurvey-client': stubSmartSurvey
});

var parseResponse = require('../../lib/smartSurveyAPICall').parseResponse;

describe('smartSuveyAPICall', function() {
  describe('smartSurveyAxiosAPI', function() {
    const baseUrl = 'a'
    const surveyID = 'b'
    const endPoint = 'c'
    const token = 'd'
    const tokenSecret = 'e'

    it('axios should been called with the parameters baseURL, surveyID, endPoint, token, tokenSecret', function () {

      // the sinon.stub resolves function is used for Promises
      // this works as well, stubAxios.get = sinon.stub().resolves('test')
      // however, this is done so that the stub can be restored for later
      let stub = sinon.stub(stubAxios, 'get').resolves('test');

      smartSurveyAxiosAPI.getResponses(baseUrl, surveyID, endPoint, token, tokenSecret);
      stubAxios.get.should.have.been.calledWithExactly('a/b/c?api_token=d&api_token_secret=e');
      stub.restore();
    });
  })
    describe('smartSurveyClientAPI', function() {
      var context;
      beforeEach( function() {
        context = {
          createClient:sinon.stub(),
          client:{
            getResponses:sinon.stub()
          },
          callback: function() {}
        }
        smartSurveyClientAPI.getData.call(context, "a", "b", "1", context.callback)
      })
      it('calls this.createClient with the correct params', function() {
         context.createClient.should.have.been.calledWithExactly("a", "b")
      })
      it('calls this.client.getResponses with the correct params', function() {
        context.client.getResponses.should.have.been.calledWithExactly("1",{ page: 1, pageSize: 25, includeLabels: false}, context.callback)
      })
      it('sets this.client to a new instance of SmartSurveyClient', function() {
          let context = {};
          // you can mock smartSurveyClientAPI as a constructor if you want to, but not essential
          smartSurveyClientAPI.createClient.call(context, "a", "b");
          context.client.should.be.instanceof(stubSmartSurvey);
      })
      it('calls the SmartSurveyClient constructor', function() {
          var context = {};
          // reassign the stubSmartSurvey with a stub to listen
          stubSmartSurvey = sinon.stub();

          // reproxyrequire because the stubSmartSurvey now has a stub
          smartSurveyClientAPI = proxyquire('../../lib/smartSurveyAPICall', {
            'smartsurvey-client': stubSmartSurvey
          });

          smartSurveyClientAPI.createClient.call(context, "1", "2");
          stubSmartSurvey.should.have.been.called;
      })
  });

      it('should call the callback with an error response when we receive an error from the api', function() {

        let context = {
          createClient: sinon.stub(),
          client: {
            getResponses: sinon.stub()
          }
        }
        const callback = sinon.stub()

        // Causes the stub to call the argument at the index as a callback function.
        // stub.callsArg(2); stub calls the 3rd argument as a callback.
        // callsArgWith like callsArg, but with arguments to pass to the callback.
        context.client.getResponses.callsArgWith(2, 'error message', 1);
        smartSurveyClientAPI.getData.call(context, "a", "b", undefined, callback)
        callback.should.have.been.calledWith('error message', 1);
      })

      it('should call the callback without an error when we receive success from the api', function() {

        let context = {
          createClient: sinon.stub(),
          client: {
            getResponses: sinon.stub()
          }
        }
        const callback = sinon.stub()

        context.client.getResponses.callsArgWith(2, null, "good");
        smartSurveyClientAPI.getData.call(context, "a", "b", undefined, callback)
        callback.should.have.been.calledWith(null, "good");
      })
    describe('parseResponse', function() {
      it('should return an error message if there is an error', function() {
        parseResponse('error', null).should.equal('error')
      })

      it('should return the result if there is no error', function() {
        const result = parseResponse(null, 'good response');
        const expect = JSON.stringify('good response', null, 2);
        result.should.deep.equal(expect);
      })

    })
});
