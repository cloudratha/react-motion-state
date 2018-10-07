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
  children: PropTypes.func.isRequired,
  onRest: PropTypes.func,
};

const defaultProps = {
  defaultStyle: null,
  onRest: null,
};

class DirectionalStateMotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: this.props.direction,
    };
  }

  componentDidUpdate() {
    if (this.state.direction !== this.props.direction) {
      this.setState({ direction: this.props.direction });
    }
  }

  getStyle = () => {
    return this.props.states[this.state.direction];
  }

  render() {
    return (
      <MotionState
        defaultStyle={this.props.defaultStyle}
        style={this.getStyle()}
        onRest={this.props.onRest}
      >
        {this.props.children}
      </MotionState>
    );
  }
}

DirectionalStateMotion.propTypes = propTypes;
DirectionalStateMotion.defaultProps = defaultProps;

export default DirectionalStateMotion;
