import React from 'react';
import PropTypes from 'prop-types';

import { MotionState } from '..';

const propTypes = {
  defaultStyle: PropTypes.objectOf(PropTypes.number),
  states: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    ),
  ).isRequired,
  direction: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onRest: PropTypes.func,
};

const defaultProps = {
  defaultStyle: null,
  onRest: null,
};

class DirectionalStateMotion extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.direction !== state.direction) {
      return { direction: props.direction };
    }

    return null;
  }

  constructor(props) {
    super(props);

    const { direction } = this.props;

    this.state = {
      direction,
    };
  }

  getStyle = () => {
    const { states } = this.props;
    const { direction } = this.state;

    return states[direction];
  }

  render() {
    const { defaultStyle, onRest, children } = this.props;

    return (
      <MotionState
        defaultStyle={defaultStyle}
        style={this.getStyle()}
        onRest={onRest}
      >
        {children}
      </MotionState>
    );
  }
}

DirectionalStateMotion.propTypes = propTypes;
DirectionalStateMotion.defaultProps = defaultProps;

export default DirectionalStateMotion;
