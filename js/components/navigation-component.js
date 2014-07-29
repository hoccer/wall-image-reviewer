'use strict';

var BackboneReactComponent = require('backbone-react-component');
var React = require('react');

module.exports = React.createClass({
  mixins: [BackboneReactComponent.mixin],

  idAtIndex: function(index) {
    var collection = this.getCollection();
    if (index >= 0 && index < collection.length) {
      return collection.at(index).id;
    } else {
      return null;
    }
  },

  navigationButton: function(title, position, imageId) {
    if (imageId !== null) {
      return React.DOM.button({
        type: 'button',
        className: 'btn btn-default position-' + position,
        onClick: function() { console.log('navigating to ' + imageId); }
      }, title);
    } else {
      return null;
    }
  },

  render: function() {
    var index = this.getCollection().indexOf(this.getModel());

    return React.DOM.div({className: 'fullscreen'}, [
      this.navigationButton('PREV.', 'left', this.idAtIndex(index + 1)),
      this.navigationButton('NEXT', 'right', this.idAtIndex(index - 1))
    ]);
  }
});
