'use strict';

var Backbone = require('backbone');
var React = require('react');

module.exports = React.createClass({
  idAtIndex: function(index) {
    var collection = this.props.imageCollection;

    if (index >= 0 && index < collection.length) {
      return collection.at(index).id;
    } else {
      return null;
    }
  },

  navigationButton: function(title, position, imageId) {
    if (imageId !== null) {
      return React.DOM.button({
        key: title,
        type: 'button',
        className: 'btn btn-default position-' + position,
        onClick: function() {
          Backbone.history.navigate('/images/' + imageId, {trigger: true});
        }
      }, title);
    } else {
      return null;
    }
  },

  render: function() {
    var index = this.props.imageCollection.indexOf(this.props.image);

    return React.DOM.div({className: 'fullscreen'}, [
      this.navigationButton('PREV.', 'left', this.idAtIndex(index + 1)),
      this.navigationButton('NEXT', 'right', this.idAtIndex(index - 1))
    ]);
  }
});
