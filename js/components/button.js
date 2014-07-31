'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      color: 'default'
    };
  },

  render: function() {
    return React.DOM.button({
      type: 'button',
      className: [
        'btn',
        'btn-' + (this.props.color),
        'position-' + this.props.position
      ].join(' '),
      onClick: this.props.onClick
    }, this.props.title);
  }
});
