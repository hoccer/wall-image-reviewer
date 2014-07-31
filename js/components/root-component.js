'use strict';

var React = require('react');
var _ = require('underscore');

var Button = require('./button');
var ImageView = require('./image-view');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      image: this.getInitialImage()
    };
  },

  getInitialImage: function() {
    var pendingImages = this.props.images.where({
      'approvalState': 'PENDING'
    });

    return _.last(pendingImages) || this.props.images.first();
  },

  componentWillMount: function() {
    this.props.images.on('change', this.handleChange, this);
  },

  componentWillUnmount: function() {
    this.props.images.off('change', this.handleChange, this);
  },

  handleChange: function() {
    this.setState({image: this.state.image});
  },

  nextImage: function() {
    return this.imageAtOffset(-1);
  },

  previousImage: function() {
    return this.imageAtOffset(1);
  },

  imageAtOffset: function(offset) {
    var index = this.props.images.indexOf(this.state.image) + offset;

    if (index >= 0 && index < this.props.images.length) {
      return this.props.images.at(index);
    } else {
      return null;
    }
  },

  navigate: function(image) {
    this.setState({image: image});
  },

  setApprovalState: function(approvalState) {
    this.state.image.save({approvalState: approvalState}, {patch: true});

    var nextImage = this.nextImage();

    if (nextImage) {
      this.navigate(nextImage);
    }
  },

  render: function() {
    var isAccepted = this.state.image.get('approvalState') === 'APPROVED';
    var isRejected = this.state.image.get('approvalState') === 'DECLINED';

    var children = [
      new Button({
        key: 'accept',
        title: isAccepted ? 'ACCEPTED' : 'ACCEPT',
        color: isAccepted ? 'success' : 'default',
        position: 'top',
        onClick: _.partial(this.setApprovalState, 'APPROVED')
      }),
      new Button({
        key: 'reject',
        title: isRejected ? 'REJECTED' : 'REJECT',
        color: isRejected ? 'danger' : 'default',
        position: 'bottom',
        onClick: _.partial(this.setApprovalState, 'DECLINED')
      }),
      new ImageView({
        key: 'image',
        imageUrl: this.state.image.fileUrl()
      })
    ];

    var previousImage = this.previousImage();
    var nextImage = this.nextImage();

    if (previousImage) {
      children.push(new Button({
        key: 'previous',
        title: 'PREV.',
        position: 'left',
        onClick: _.partial(this.navigate, previousImage)
      }));
    }

    if (nextImage) {
      children.push(new Button({
        key: 'next',
        title: 'NEXT',
        position: 'right',
        onClick: _.partial(this.navigate, nextImage)
      }));
    }

    return React.DOM.div({className: 'fullscreen'}, children);
  }
});
