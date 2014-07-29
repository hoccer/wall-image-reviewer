'use strict';

var Backbone = require('backbone');
var React = require('react');
var _ = require('underscore');

var rootComponent = require('./components/root-component');

module.exports = Backbone.Router.extend({
  routes: {
    'images/:id': 'image',
    '*path': 'default'
  },

  initialize: function(imageCollection) {
    this.imageCollection = imageCollection;
  },

  image: function(id) {
    React.renderComponent(rootComponent({
      collection: this.imageCollection,
      imageId: id
    }), document.body);
  },

  default: function() {
    var pendingImages = this.imageCollection.where({
      'approvalState': 'PENDING'
    });

    var startImage = _.last(pendingImages);

    Backbone.history.navigate('/images/' + startImage.id, {trigger: true});
  }
});
