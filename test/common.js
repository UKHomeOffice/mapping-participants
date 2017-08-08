'use strict';

// Global config file for unit tests so some of the setup does not need to be repeated
global.chai = require('chai').use(require('chai-as-promised')).use(require('sinon-chai'));
global.should = chai.should();
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
