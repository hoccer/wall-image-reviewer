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

    return {
      image: _.last(pendingImages) || this.props.images.first()
    };
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

  imageAtIndex: function(index) {
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
  },

  render: function() {
    var isAccepted = this.state.image.get('approvalState') === 'APPROVED';
    var isRejected = this.state.image.get('approvalState') === 'DECLINED';

    var children = [
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
    ];

    var index = this.props.images.indexOf(this.state.image);
    var previousImage = this.imageAtIndex(index + 1);
    var nextImage = this.imageAtIndex(index - 1);

    if (nextImage) {
      children.push(new Button({
        title: 'NEXT',
        position: 'right',
        onClick: _.partial(this.navigate, nextImage)
      }));
    }

    if (previousImage) {
      children.push(new Button({
        title: 'PREV.',
        position: 'left',
        onClick: _.partial(this.navigate, previousImage)
      }));
    }

    return React.DOM.div({className: 'fullscreen'}, children);
  }
});
