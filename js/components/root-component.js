'use strict';

var React = require('react');

var approvalComponent = require('./approval-component');
var imageComponent = require('./image-component');
var navigationComponent = require('./navigation-component');

module.exports = React.createClass({
  render: function() {
    return React.DOM.div({className: 'fullscreen'}, [
      navigationComponent({
        key: 'nav',
        imageCollection: this.props.imageCollection,
        image: this.props.image
      }),
      imageComponent({
        key: 'image',
        imageUrl: this.props.image.fileUrl()
      }),
      approvalComponent({
        key: 'approval',
        image: this.props.image
      })
    ]);
  }
});
