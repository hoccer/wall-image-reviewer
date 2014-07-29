'use strict';

var Backbone = require('backbone');
var WebClient = require('talk-webclient-js-model');
var $ = require('jquery');

var App = require('./app');
var config = require('./config');

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

  // Start Backbone router
  new App(imageCollection);
  Backbone.history.start();
});
