'use strict';

var React = require('react');

module.exports = React.createClass({
  approvalButton: function(title, activeTitle, position, activeColor, approvalState) {
    var active = this.props.image.get('approvalState') === approvalState;
    var buttonStyle = active ? 'btn-' + activeColor : 'btn-default';

    var attributes = {
      key: title,
      type: 'button',
      className: 'btn ' + buttonStyle + ' position-' + position,
      onClick: (function() {
        this.props.image.save({approvalState: approvalState}, {patch: true});
      }).bind(this)
    };

    if (active) {
      attributes.disabled = 'disabled';
    }

    return React.DOM.button(attributes, active ? activeTitle : title);
  },

  render: function() {
    return React.DOM.div({className: 'fullscreen'}, [
      this.approvalButton('ACCEPT', 'ACCEPTED', 'top', 'success', 'APPROVED'),
      this.approvalButton('REJECT', 'REJECTED', 'bottom', 'danger', 'DECLINED')
    ]);
  }
});
