'use strict';

var React = require('react');

var imageComponent = require('./image-component');
var navigationComponent = require('./navigation-component');

module.exports = React.createClass({
  componentWillMount: function() {
    this.props.imageCollection.on('change', this.forceUpdate, this);
  },

  componentWillUnmount: function() {
    this.props.imageCollection.off('change', this.forceUpdate, this);
  },

  render: function() {
    return React.DOM.div({className: 'fullscreen'}, [
      navigationComponent({
        key: 'nav',
        imageCollection: this.props.imageCollection,
        image: this.props.image
      }),
      imageComponent({
        key: this.props.image.id,
        imageUrl: this.props.image.fileUrl()
      })
    ]);
  }
});
