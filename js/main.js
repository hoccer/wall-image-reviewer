'use strict';

var Backbone = require('backbone');
var React = require('react');
var WebClient = require('talk-webclient-js-model');
var $ = require('jquery');
var _ = require('underscore');

var config = require('./config');
var imageApprovalComponent = require('./components/image-approval-component');

// Help Backbone find jQuery
Backbone.$ = $;

// Initialize image collection
var imageCollection = new WebClient.Model.DownloadCollection(null, {
  backendUrl: config.backendUrl
});

// Initialize Backbone router
var Router = Backbone.Router.extend({
  routes: {
    'images/:id': 'image',
    '*path': 'default'
  },

  image: function(id) {
    React.renderComponent(imageApprovalComponent({
      collection: imageCollection,
      imageId: id
    }), document.getElementById('container'));
  },

  default: function() {
    var pendingImages = imageCollection.where({'approvalState': 'PENDING'});
    var startImage = _.last(pendingImages);

    Backbone.history.navigate('/images/' + startImage.id, {trigger: true});
  }
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
  new Router();
  Backbone.history.start();
});
