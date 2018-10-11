import React from 'react';
import PropTypes from 'prop-types';

import { DirectionalMotionState } from '..';

const propTypes = {
  in: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  defaultStyle: PropTypes.objectOf(PropTypes.number),
  onEnter: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  ).isRequired,
  onExit: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  ).isRequired,
  children: PropTypes.func.isRequired,
  onRest: PropTypes.func,
};

const defaultProps = {
  in: false,
  unmountOnExit: false,
  defaultStyle: null,
  onRest: null,
};

class ConditionalMotionState extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.in !== state.active) {
      return {
        active: props.in,
        mount: (props.in && !state.mount),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    const { in: bool } = this.props;

    this.state = {
      active: bool,
      mount: bool,
    };
  }

  maybeUnmount = () => {
    const { onRest, unmountOnExit } = this.props;
    const { active } = this.state;

    if (!active && unmountOnExit) {
      this.setState({ mount: false });
    }

    if (onRest) {
      onRest();
    }
  }

  render() {
    const {
      defaultStyle,
      onEnter,
      onExit,
      children,
    } = this.props;
    const { active, mount } = this.state;

    return (
      <React.Fragment>
        {
          mount && (
            <DirectionalMotionState
              defaultStyle={defaultStyle}
              states={{
                in: onEnter,
                out: onExit,
              }}
              direction={(active) ? 'in' : 'out'}
              onRest={this.maybeUnmount}
            >
              {children}
            </DirectionalMotionState>
          )
        }
      </React.Fragment>
    );
  }
}

ConditionalMotionState.propTypes = propTypes;
ConditionalMotionState.defaultProps = defaultProps;

export default ConditionalMotionState;
