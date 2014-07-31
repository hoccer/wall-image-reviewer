'use strict';

var Backbone = require('backbone');
var React = require('react');
var WebClient = require('talk-webclient-js-model');
var $ = require('jquery');

var config = require('./config');
var RootComponent = require('./components/root-component');

// Help Backbone find jQuery
Backbone.$ = $;

// Initialize image collection
var images = new WebClient.Model.DownloadCollection(null, {
  backendUrl: config.backendUrl
});

images.fetch({data: {mediaType: 'image'}}).then(function() {
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
      images.add(download, {at: 0, merge: true});
    }
  });

  // Render root component
  React.renderComponent(
    new RootComponent({images: images}),
    document.body
  );
});
