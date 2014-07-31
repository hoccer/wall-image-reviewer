'use strict';

var React = require('react');
var _ = require('underscore');

var Button = require('./button');
var ImageView = require('./image-view');

module.exports = React.createClass({
  getInitialState: function() {
    var pendingImages = this.props.images.where({
      'approvalState': 'PENDING'
    });

    var initialImage = _.last(pendingImages) || this.props.images.first();
    return this.getStateForImage(initialImage);
  },

  getStateForImage: function(image) {
    var index = this.props.images.indexOf(image);

    return {
      previousImageId: this.imageIdAtIndex(index + 1),
      nextImageId: this.imageIdAtIndex(index - 1),
      image: image
    };
  },

  imageIdAtIndex: function(index) {
    if (index >= 0 && index < this.props.images.length) {
      return this.props.images.at(index).id;
    } else {
      return null;
    }
  },

  navigate: function(imageId) {
    var image = this.props.images.get(imageId);
    this.setState(this.getStateForImage(image));
  },

  setApprovalState: function(approvalState) {
    this.state.image.save({approvalState: approvalState}, {patch: true});
  },

  render: function() {
    var isAccepted = this.state.image.get('approvalState') === 'APPROVED';
    var isRejected = this.state.image.get('approvalState') === 'DECLINED';

    return React.DOM.div({className: 'fullscreen'}, [
      new Button({
        title: 'NEXT',
        position: 'right',
        onClick: _.partial(this.navigate, this.state.nextImageId)
      }),
      new Button({
        title: 'PREV.',
        position: 'left',
        onClick: _.partial(this.navigate, this.state.previousImageId)
      }),
      new Button({
        title: isAccepted ? 'ACCEPTED' : 'ACCEPT',
        color: isAccepted ? 'success' : 'default',
        position: 'top',
        onClick: _.partial(this.setApprovalState, 'APPROVED')
      }),
      new Button({
        title: isRejected ? 'REJECTED' : 'REJECT',
        color: isRejected ? 'danger' : 'default',
        position: 'bottom',
        onClick: _.partial(this.setApprovalState, 'DECLINED')
      }),
      new ImageView({
        imageUrl: this.state.image.fileUrl()
      })
    ]);
  }
});
