'use strict';

var apiCall = require('../../lib/smartSurveyAPICall');
const config = require('../../config');
const proxy = require('proxyquire');
const sinon = require('sinon');  
const chai = require('chai');
var should = chai.should();

const proxyquire = require('proxyquire');
let stubAxios = {};

const smartSurveyAPI = proxyquire('../../lib/smartSurveyAPICall', {
  'axios': stubAxios
});

let stubSmartSurvey = {};

const smartSurveyClientAPI = proxyquire('../../lib/smartSurveyAPICall', {
  'smartsurvey-client': stubSmartSurvey
});

describe('api-call', () => {
  describe('getResponses', () => {   
    beforeEach(() => {
      
    }) 

    //ideas of what to do
    it('assert that it has been called with the parameters baseURL blah blah', function() {
            const baseUrl = 'a' 
      const surveyID = '1'
      const endPoint = '2'
      const token = '3'
      const tokenSecret = '4'

      // resolves for Promises
      // stubAxios.get = sinon.stub().resolves('test')
      let stub = sinon.stub(stubAxios, 'get').resolves('test');

      // sinon.stub(stubAxios.prototype, 'get').returns('blah');
      smartSurveyAPI.getResponses(baseUrl, surveyID, endPoint, token, tokenSecret);
      stub.restore();
      // mock the api library(smartSurvey/axious) proxyRequire or rewire
      // run the get method in lib doc
      // assert axious was run with the expected parameters
    });

    // beforeAll setup the mock
    //describe block
    it.only('SmartSurveyAPIClient test: assert that methods have been called with expected Args ', function() {
      // mock SmartSurveyAPItest, proxyRequire or rewire
      // set up mock to expect the correct args and respond appropriately
      // check the assertion works
      //let stub = sinon.stub(smartSurveyClientAPI, 'get').callsArgsWith(2, false, {});
      // smartSurveyAPIClient.getData(baseUrl, surveyID, endPoint, token, tokenSecret);
      // var that = {}
      // that.client = {getResponses : () => {

      // }};
      // // var twat = apiCall.getData.applyCall
      // apiCall.getData.apply(that, ['test', 'test', 'test'])

    });    

    it('SmartSurveyAPItest: assert that methods have been called with not expected Args ', function() {
      // mock SmartSurveyAPItest, proxyRequire or rewire
      // set up mock to expect the correct args and respond appropriately
      // check the assertion works
    });    

    it('SmartSurveyAPItest: when there is an error, log it out', function() {
      // mock SmartSurveyAPItest, proxyRequire or rewire
      // set up mock to expect the correct args and respond appropriately
      // check the assertion works
    });    
  });
})
