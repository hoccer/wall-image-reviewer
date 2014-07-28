'use strict';

var BackboneReactComponent = require('backbone-react-component');
var React = require('react');

module.exports = React.createClass({
  mixins: [BackboneReactComponent.mixin],

  render: function() {
    return React.DOM.img({
      className: 'image',
      src: this.getModel().fileUrl()
    });
  }
});
