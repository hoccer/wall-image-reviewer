'use strict';

var BackboneReactComponent = require('backbone-react-component');
var React = require('react');

var imageComponent = require('./image-component');
var navigationComponent = require('./navigation-component');

module.exports = React.createClass({
  mixins: [BackboneReactComponent.mixin],

  render: function() {
    var collection = this.getCollection();
    var imageId = this.props.imageId;
    var image = collection.get(imageId);

    return React.DOM.div({className: 'fullscreen'}, [
      navigationComponent({
        collection: collection,
        model: image
      }),
      imageComponent({
        model: image
      })
    ]);
  }
});
