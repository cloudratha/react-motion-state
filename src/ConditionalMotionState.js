import React from 'react';
import PropTypes from 'prop-types';

import { DirectionalMotionState } from '..';

const propTypes = {
  unmountOnExit: PropTypes.bool,
};

const defaultProps = {
  unmountOnExit: false,
};

class ConditionalMotionState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      in: this.props.in,
      mount: this.props.in,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.in !== prevProps.in) {
      this.setState({ in: this.props.in });

      if (this.props.in && !this.state.mount) {
        this.setState({ mount: true });
      }
    }
  }

  maybeUnmount = () => {
    if (!this.state.in && this.props.unmountOnExit) {
      this.setState({ mount: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.mount && (
            <DirectionalMotionState
              defaultStyle={this.props.defaultStyle}
              states={{
                in: this.props.onEnter,
                out: this.props.onExit,
              }}
              direction={(this.state.in) ? 'in' : 'out'}
              onRest={this.maybeUnmount}
            >
              {this.props.children}
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
