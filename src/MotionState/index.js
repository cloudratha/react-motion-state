import React from 'react';
import PropTypes from 'prop-types';
import { Motion } from 'react-motion';
import raf from 'raf';
import isEqual from 'react-fast-compare';

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

    const { defaultStyle } = this.props;

    this.state = {
      animating: !!defaultStyle,
    };

    this.hasRested = !defaultStyle;
  }

  componentDidUpdate(prevProps) {
    const { style } = this.props;
    const { animating } = this.state;

    if (!animating && !this.hasRested && !isEqual(prevProps.style, style)) {
      raf(() => {
        this.setState({ animating: true });
      });
    }
  }

  onRest = () => {
    const { onRest } = this.props;
    const { animating } = this.state;

    this.hasRested = true;

    if (animating) {
      this.setState({ animating: false });
    }

    if (onRest) {
      onRest();
    }
  }

  interpolateChild = (style) => {
    const { animating } = this.state;
    const { children } = this.props;

    if (this.styleRaf) {
      raf.cancel(this.styleRaf);
    }

    if (!this.hasRested) {
      this.checkAnimationDone();
    } else {
      this.hasRested = false;
    }
    return children(style, animating);
  }

  checkAnimationDone(count = 0) {
    this.styleRaf = raf(() => {
      if (count >= 2) {
        this.setState({ animating: false });
      } else {
        this.checkAnimationDone(count + 1);
      }
    });
  }

  render() {
    const { defaultStyle, style } = this.props;

    return (
      <Motion
        defaultStyle={defaultStyle}
        style={style}
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
