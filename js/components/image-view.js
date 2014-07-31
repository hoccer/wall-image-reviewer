'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },

  componentWillMount: function() {
    this.preloadImage = new Image();

    this.preloadImage.onload = (function() {
      this.setState({loaded: true});
    }).bind(this);
  },

  componentWillUnmount: function() {
    this.preloadImage = null;
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.imageUrl !== this.props.imageUrl) {
      this.setState({loaded: false});
    }
  },

  render: function() {
    this.preloadImage.src = this.props.imageUrl;

    return React.DOM.img({
      className: 'image',
      src: this.state.loaded ? this.props.imageUrl : 'dist/img/loading.gif'
    });
  }
});
