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
};

const defaultProps = {
  defaultStyles: null,
  willEnter: null,
  willLeave: null,
  didLeave: () => { },
};

class TransitionMotionState extends React.Component {
  constructor(props) {
    super(props);

    const { defaultStyles, styles } = this.props;

    const initialStyles = (typeof styles === 'function')
      ? styles(defaultStyles)
      : styles;

    this.state = initialStyles.reduce((accum, config) => {
      accum[config.key] = (defaultStyles) ? 'initial' : 'initial-done'; // eslint-disable-line no-param-reassign
      return accum;
    }, {});

    this.styleRafs = {};
  }

  componentWillUnmount() {
    Object.keys(this.styleRafs).forEach(key => raf.cancel(this.styleRafs[key]));
  }

  willEnter = (config) => {
    const { willEnter } = this.props;

    const state = willEnter ? 'enter' : 'enter-done';

    raf(() => {
      this.setState({ [config.key]: state });
    });

    return willEnter ? willEnter(config) : config.style || {};
  }

  willLeave = (config) => {
    const { willLeave } = this.props;
    const { [config.key]: currentState } = this.state;

    const state = willLeave ? 'exit' : 'exit-done';

    // willLeave will be called on each step to re-evaluate styles
    // So make sure we only update state when necessary
    if (currentState && currentState !== state) {
      raf(() => {
        this.setState({ [config.key]: state });
      });
    }

    return willLeave ? willLeave(config) : config.style;
  }

  getState = (config) => {
    const { [config.key]: currentState } = this.state;

    // Everytime the state is called lets clear the previous check
    if (this.styleRafs[config.key]) {
      raf.cancel(this.styleRafs[config.key]);
    }

    if (currentState && currentState.indexOf('done') === -1) {
      this.checkAnimationDone(config.key);
    }

    return currentState;
  }

  interpolateStyles = (styles) => {
    const { children } = this.props;

    const stateStyles = styles.map(config => ({
      ...config,
      data: {
        ...config.data,
        transition: this.getState(config),
      },
    }));

    return children(stateStyles);
  }

  checkAnimationDone(key, count = 0) {
    this.styleRafs[key] = raf(() => {
      if (count >= 2) {
        const { [key]: currentState } = this.state;
        this.setState({ [key]: `${currentState}-done` });
      } else {
        this.checkAnimationDone(key, count + 1);
      }
    });
  }

  render() {
    const { defaultStyles, styles, didLeave } = this.props;

    return (
      <TransitionMotion
        defaultStyles={defaultStyles}
        styles={styles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        didLeave={didLeave}
      >
        {this.interpolateStyles}
      </TransitionMotion>
    );
  }
}

TransitionMotionState.propTypes = propTypes;
TransitionMotionState.defaultProps = defaultProps;

export default TransitionMotionState;
