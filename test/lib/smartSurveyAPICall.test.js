'use strict';

const proxy = require('proxyquire');
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

// create an empty function using echma 5 syntax because of using the this context
var stubSmartSurvey = function(params) {
}

const smartSurveyClientAPI = proxyquire('../../lib/smartSurveyAPICall', {
  'smartsurvey-client': stubSmartSurvey
});

describe('smartSuveyAPICall', function() {
  describe('smartSurveyAxiosAPI', function() {
    beforeEach(() => {
      
    }) 
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
      var that;
      beforeEach( function() {
        that = {
          createClient:sinon.stub(),
          client:{
            getResponses:sinon.stub()
          },
          parseResponse: "does not matter"
        }
        smartSurveyClientAPI.getData.call(that, "a", "b", "1")
      })
      it('calls this.createClient with the correct params', function() {
         that.createClient.should.have.been.calledWithExactly("a", "b")
      })
      it('calls this.client.getResponses with the correct params', function() {
        that.client.getResponses.should.have.been.calledWithExactly("1",{ page: 1, pageSize: 25, includeLabels: false}, that.parseResponse)
      })
      it('sets this.client to a new instance of SmartSurveyClient', function() {
          let that = {};
          // you can mock smartSurveyClientAPI as a constructor if you want to, but not essential
          smartSurveyClientAPI.createClient.call(that, "a", "b");
          that.client.should.be.instanceof(stubSmartSurvey);
      })
      it('calls the SmartSurveyClient constructor with the correct params', function() {
          var that = {};
          var stub = sinon.stub(stubSmartSurvey, 'constructor')

          stubSmartSurvey.prototype.constructor = sinon.stub()

          smartSurveyClientAPI.createClient.call(that, "1", "2");
          stubSmartSurvey.constructor.should.have.been.calledWithExactly({ apiToken: '1', apiTokenSecret: '2' })
      })

      it('SmartSurveyAPItest: when there is an error, log it out', function() {
        consoleSpy = sinon.stub(console, 'log');
        var msg = 'my test error';

        let context = {
          createClient: sinon.stub(),
          client: {
            getResponses: sinon.stub()
          },
          parseResponse: "test"
        };
        context.client.getResponses.withArgs(undefined, { page: 1, pageSize: 25, includeLabels: false}, "test").returns(msg)

        smartSurveyClientAPI.getData.call(context, "a", "b", undefined);
        console.log.should.have.been.calledWith(msg);
        console.log.restore();
      });
  });
});
