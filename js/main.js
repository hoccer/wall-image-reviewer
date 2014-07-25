'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var WebClient = require('talk-webclient-js-model');

var config = require('./config');
var imageListView = require('./views/image-list-view');

// Help Backbone find jQuery
Backbone.$ = $;

// Initialize image collection
var imageCollection = new WebClient.Model.DownloadCollection(null, {
  backendUrl: config.backendUrl
});

imageCollection.fetch({data: {mediaType: 'image'}}).then(function() {
  // Update image collection with WebSocket updates
  var updateUrl = function(backendUrl) {
    var url = backendUrl ?
              backendUrl.replace('http', 'ws') :
              'ws://' + window.location.host;
    return url + '/updates';
  };

  var observer = new WebClient.WebSocket.Observer(updateUrl(config.backendUrl));
  observer.subscribe('/api/downloads', function(download) {
    if (download.mediaType === 'image') {
      imageCollection.add(download, {at: 0, merge: true});
    }
  });

  // Render root view component
  React.renderComponent(
    imageListView({collection: imageCollection}), document.body);
});


