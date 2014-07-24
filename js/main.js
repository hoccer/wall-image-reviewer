'use strict';

var Backbone = require('backbone');
var jQuery = require('jquery');
var React = require('react');

var config = require('./config');
var imageGridView = require('./views/image-grid-view');

var TalkWebClientModel = require('talk-webclient-js-model');

// Help Backbone find jQuery
Backbone.$ = jQuery;

// Initialize image collection
var images = new TalkWebClientModel.Model.DownloadCollection();
images.fetch({data: {mediaType: 'image'}});

// Update image collection with WebSocket updates
var updateUrl = function(backendUrl) {
  var url = backendUrl ?
            backendUrl.replace('http', 'ws') :
            'ws://' + window.location.host;
  return url + '/updates';
};

var updater = new TalkWebClientModel.WebSocket.CollectionUpdater(
	updateUrl(config.backendUrl)
);
updater.subscribe('/api/downloads', images, function(download) {
  return download.mediaType === 'image';
});

// Render root view component
React.renderComponent(imageGridView({collection: images}), document.body);
