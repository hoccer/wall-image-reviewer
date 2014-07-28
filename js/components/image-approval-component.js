'use strict';

var BackboneReactComponent = require('backbone-react-component');
var React = require('react');

var imageComponent = require('./image-component');

module.exports = React.createClass({
  mixins: [BackboneReactComponent.mixin],

  nextButton: function(index) {
    if (index > 0) {
      var previousImage = this.getCollection().at(index - 1);

      return React.DOM.a({
        className: 'btn btn-default',
        href: '/images/' + previousImage.id
      }, 'Next');
    }

    return null;
  },

  previousButton: function(index) {
    if (index < this.getCollection().length - 1) {
      var nextImage = this.getCollection().at(index + 1);

      return React.DOM.a({
        className: 'btn btn-default',
        href: '/images/' + nextImage.id
      }, 'Previous');
    }

    return null;
  },

  render: function() {
    var collection = this.getCollection();
    var imageId = this.props.imageId;

    var image = collection.get(imageId);
    var index = collection.indexOf(image);

    var content = image ?
                  imageComponent({model: image}) :
                  'No image with ID ' + this.props.imageId;

    return React.DOM.div({className: 'row fullscreen'}, [
      React.DOM.div({className: 'col-md-1'}, this.previousButton(index)),
      React.DOM.div({className: 'col-md-10 text-center'}, content),
      React.DOM.div({className: 'col-md-1'}, this.nextButton(index))
    ]);
  }
});
