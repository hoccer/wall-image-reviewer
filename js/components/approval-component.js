'use strict';

var Backbone = require('backbone');
var React = require('react');

module.exports = React.createClass({
  approvalButton: function(title, position) {
    return React.DOM.button({
      key: title,
      type: 'button',
      className: 'btn btn-default position-' + position
    }, title);
  },

  render: function() {
    return React.DOM.div({className: 'fullscreen'}, [
      this.approvalButton('ACCEPT', 'top'),
      this.approvalButton('REJECT', 'bottom')
    ]);
  }
});
