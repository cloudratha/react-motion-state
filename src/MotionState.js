import React from 'react';
import { Motion } from 'react-motion';

class MotionState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false
    };

    this.hasRested = true;

    this.interpolateChild = this.interpolateChild.bind(this);
    this.onRest = this.onRest.bind(this);
  }

  interpolateChild(style) {
    if (!this.hasRested && !this.state.animating) {
      this.setState({ animating: true });
    } else {
      this.hasRested = false;
    }
    return this.props.children(style, this.state.animating);
  }

  onRest() {
    this.hasRested = true;
    if (this.state.animating) {
      this.setState({ animating: false });
    }

    if (this.props.onRest) {
      this.props.onRest();
    }
  }

  render() {
    return (
      <Motion
        defaultStyle={this.props.defaultStyle}
        style={this.props.style}
        onRest={this.onRest}
      >
        {this.interpolateChild}
      </Motion>
    );
  }
}

export default MotionState;
