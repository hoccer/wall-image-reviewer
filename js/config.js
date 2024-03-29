'use strict';

var querystring = require('querystring');
var _ = require('underscore');

var defaults = {
  backendUrl: ''
};

var query = querystring.parse(window.location.search.substr(1));
var config = _.chain(query)
  .pick(_.keys(defaults))
  .defaults(defaults)
  .value();

module.exports = config;
