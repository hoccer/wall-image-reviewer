'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return React.DOM.img({
      className: 'image',
      src: this.props.imageUrl
    });
  }
});
