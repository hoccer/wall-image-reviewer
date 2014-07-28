'use strict';

var BackboneReactComponent = require('backbone-react-component');
var React = require('react');

module.exports = React.createClass({
  mixins: [BackboneReactComponent.mixin],

  render: function() {
    var image = this.getCollection().get(this.props.imageId);

    var content;

    if (image) {
      content = React.DOM.img({
        className: 'image',
        src: image.fileUrl()
      });
    } else {
      content = 'No image with ID ' + this.props.imageId;
    }

    return React.DOM.div({
      className: 'fullscreen'
    }, content);
  }
});
