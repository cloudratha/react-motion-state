import React from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion } from 'react-motion';
import raf from 'raf';

const propTypes = {
  defaultStyles: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      data: PropTypes.any,
      style: PropTypes.objectOf(PropTypes.number).isRequired,
    }),
  ),
  styles: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        data: PropTypes.any,
        style: PropTypes.objectOf(
          PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        ).isRequired,
      }),
    ),
  ]).isRequired,
  children: PropTypes.func.isRequired,
  willEnter: PropTypes.func,
  willLeave: PropTypes.func,
  didLeave: PropTypes.func,
}

const defaultProps = {
  defaultStyles: null,
  willEnter: () => { },
  willLeave: () => { },
  didLeave: () => { },
}

class TransitionMotionState extends React.Component {
  constructor(props) {
    super(props);

    const styles = (typeof this.props.styles === 'function') ?
      this.props.styles(this.props.defaultStyles) :
      this.props.styles;

    this.state = styles.reduce((accum, config) => {
      accum[config.key] = 'initial';
      return accum;
    }, {});

    this.styleRafs = {};
  }

  componentWillUnmount() {
    Object.keys(this.styleRafs).forEach(key => raf.cancel(this.styleRafs[key]));
  }

  checkAnimationDone(key, count = 0) {
    this.styleRafs[key] = raf(() => {
      if (count >= 2) {
        this.setState({ [key]: `${this.state[key]}-done` });
      } else {
        this.checkAnimationDone(key, count + 1);
      }
    })
  }

  willEnter = (config) => {
    const state = this.props.willEnter ? 'enter' : 'enter-done';
    this.setState({ [config.key]: state });

    return this.props.willEnter ? this.props.willEnter(config) : config.style;
  }

  willLeave = (config) => {
    const state = this.props.willLeave ? 'exit' : 'exit-done';

    // willLeave will be called on each step to re-evaluate styles
    // So make sure we only update state when necessary
    if (this.state[config.key] !== state) {
      this.setState({ [config.key]: state });
    }

    return this.props.willLeave ? this.props.willLeave(config) : config.style;
  }

  getState = (config) => {
    // Everytime the state is called lets clear the previous check
    if (this.styleRafs[config.key]) {
      raf.cancel(this.styleRafs[config.key]);
    }

    if (
      this.state[config.key] &&
      this.state[config.key].indexOf('done') === -1
    ) {
      this.checkAnimationDone(config.key);
    }

    return this.state[config.key];
  }

  interpolateStyles = (styles) => {
    const stateStyles = styles.map(config => ({
      ...config,
      data: {
        ...config.data,
        transition: this.getState(config)
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
        didLeave={this.props.didLeave}
      >
        {this.interpolateStyles}
      </TransitionMotion>
    );
  }
}

TransitionMotionState.propTypes = propTypes;
TransitionMotionState.defaultProps = defaultProps;

export default TransitionMotionState;
