'use strict';

var BackboneReactComponent = require('backbone-react-component');
var React = require('react');

var imageComponent = require('./image-component');

module.exports = React.createClass({
  mixins: [BackboneReactComponent.mixin],

  render: function() {
    var image = this.getCollection().get(this.props.imageId);

    var content = image ?
                  imageComponent({model: image}) :
                  'No image with ID ' + this.props.imageId;

    return React.DOM.div({
      className: 'fullscreen'
    }, content);
  }
});
