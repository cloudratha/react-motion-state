import React from 'react';
import PropTypes from 'prop-types';

import { Motion } from 'react-motion';

const propTypes = {
  defaultStyle: PropTypes.objectOf(PropTypes.number),
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  ).isRequired,
  children: PropTypes.func.isRequired,
  onRest: PropTypes.func,
};

const defaultProps = {
  defaultStyle: null,
  onRest: null,
};

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

MotionState.propTypes = propTypes;
MotionState.defaultProps = defaultProps;

export default MotionState;
