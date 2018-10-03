import React from 'react';
import { TransitionMotion } from 'react-motion';

class TransitionMotionState extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.styles.reduce((accum, config) => {
      accum[config.key] = 'initial';
      return accum;
    }, {});

    this.styleTimeouts = {};

    this.interpolateStyles = this.interpolateStyles.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
    this.getState = this.getState.bind(this);
  }

  willEnter(config) {
    const state = this.props.willEnter ? 'enter' : 'enter-done';
    this.setState({ [config.key]: state });

    return this.props.willEnter ? this.props.willEnter(config) : config.style;
  }

  willLeave(config) {
    const state = this.props.willLeave ? 'exit' : 'exit-done';
    // willLeave will be called on each step to re-evaluate styles
    // So make sure we only update state when necessary
    if (this.state[config.key] !== state) {
      this.setState({ [config.key]: state });
    }

    return this.props.willLeave ? this.props.willLeave(config) : config.style;
  }

  getState(config) {
    // Everytime the state is called lets attach a timeout to know when its done
    clearTimeout(this.styleTimeouts[config.key]);
    if (
      this.state[config.key] &&
      this.state[config.key].indexOf('done') === -1
    ) {
      this.styleTimeouts[config.key] = setTimeout(() => {
        this.setState({ [config.key]: `${this.state[config.key]}-done` });
      }, 100);
    }
    return this.state[config.key];
  }

  interpolateStyles(styles) {
    const stateStyles = styles.map(config => ({
      ...config,
      data: {
        ...config.data,
        state: this.getState(config)
      }
    }));
    return this.props.children(stateStyles);
  }

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.props.defaultStyles}
        styles={this.props.styles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {this.interpolateStyles}
      </TransitionMotion>
    );
  }
}

export default TransitionMotionState;
