import React from 'react';
import renderer from 'react-test-renderer';
import { spring } from 'react-motion';

import TransitionMotionState from '..';
import { reset, step } from 'raf';


describe('TransitionMotionState', () => {
  beforeEach(() => {
    jest.mock('raf');
    reset();
  });

  test('Initial states trigger with defaultStyles', () => {
    const states = [];
    renderer.create(
      <TransitionMotionState
        defaultStyles={[{ key: '1', style: { a: 0 } }]}
        styles={[{ key: '1', style: { a: spring(5) } }]}
      >
        {
          ([{ style: { a }, data: { transition } }]) => {
            states.push({ [a]: transition });
            return null;
          }
        }
      </TransitionMotionState>,
    );

    expect(states).toEqual([{ 0: 'initial' }]);
    step(64);
    expect(states).toHaveLength(63);
    expect(states[62]).toEqual({ 5: 'initial-done' });
  });

  test('Initial state is set to done without defaultStyles', () => {
    const states = [];
    renderer.create(
      <TransitionMotionState
        styles={[{ key: '1', style: { a: spring(5) } }]}
      >
        {
          ([{ style: { a }, data: { transition } }]) => {
            states.push({ [a]: transition });
            return null;
          }
        }
      </TransitionMotionState>,
    );

    expect(states).toEqual([{ 5: 'initial-done' }]);
  });

  test('State is set to enter with willEnter', () => {
    const states = [];
    class App extends React.Component {
      constructor() {
        super();

        this.state = {
          styles: [
            { key: '1', style: { a: spring(5) } },
          ],
        };
      }

      render() {
        const { styles } = this.state;
        return (
          <TransitionMotionState
            styles={styles}
            willEnter={() => ({ a: 0 })}
          >
            {
              (interpolatedStyles) => {
                states.push(interpolatedStyles.map(({
                  key,
                  data: { transition },
                }) => ({
                  [key]: transition,
                })));
                return null;
              }
            }
          </TransitionMotionState>
        );
      }
    }

    const component = renderer.create(<App />).root;
    const styles = [
      ...component.instance.state.styles,
      { key: '2', style: { a: spring(5) } },
    ];
    component.instance.setState({
      styles,
    });
    step(2);
    expect(states).toEqual([
      [{ 1: 'initial-done' }],
      // React-motion triggers a re-render
      [{ 1: 'initial-done' }],
      // Transition is initially undefined as state is applied in next tick
      [{ 1: 'initial-done' }, { 2: undefined }],
      [{ 1: 'initial-done' }, { 2: 'enter' }],
      // React Motion triggers another re-render on state change
      [{ 1: 'initial-done' }, { 2: 'enter' }],
    ]);
    step(62);
    expect(states[64]).toEqual([
      { 1: 'initial-done' }, { 2: 'enter-done' },
    ]);
  });

  test('State is set to done without willEnter', () => {
    const states = [];
    class App extends React.Component {
      constructor() {
        super();

        this.state = {
          styles: [
            { key: '1', style: { a: spring(5) } },
          ],
        };
      }

      render() {
        const { styles } = this.state;
        return (
          <TransitionMotionState
            styles={styles}
          >
            {
              (interpolatedStyles) => {
                states.push(interpolatedStyles.map(({
                  key,
                  style: { a },
                  data: { transition },
                }) => ({
                  key,
                  [a]: transition,
                })));
                return null;
              }
            }
          </TransitionMotionState>
        );
      }
    }

    const component = renderer.create(<App />).root;
    const styles = [
      ...component.instance.state.styles,
      { key: '2', style: { a: 10 } },
    ];
    component.instance.setState({
      styles,
    });
    step(2);
    expect(states).toEqual([
      [{ key: '1', 5: 'initial-done' }],
      // React-motion triggers a re-render
      [{ key: '1', 5: 'initial-done' }],
      // Transition is initially undefined as state is applied in next tick
      [{ key: '1', 5: 'initial-done' }, { key: '2', 10: undefined }],
      [{ key: '1', 5: 'initial-done' }, { key: '2', 10: 'enter-done' }],
    ]);
  });

  test('State is set to exit with willLeave', () => {
    const states = [];
    class App extends React.Component {
      constructor() {
        super();

        this.state = {
          styles: [
            { key: '1', style: { a: 5 } },
          ],
        };
      }

      render() {
        const { styles } = this.state;
        return (
          <TransitionMotionState
            styles={styles}
            willLeave={() => ({ a: spring(0) })}
          >
            {
              (interpolatedStyles) => {
                states.push(interpolatedStyles.map(({
                  key,
                  data: { transition },
                }) => ({
                  [key]: transition,
                })));
                return null;
              }
            }
          </TransitionMotionState>
        );
      }
    }

    const component = renderer.create(<App />).root;
    component.instance.setState({
      styles: [{ key: '2', style: { a: 5 } }],
    });
    step(2);
    expect(states).toEqual([
      [{ 1: 'initial-done' }],
      // React-motion triggers a re-render
      [{ 1: 'initial-done' }],
      // Transition is unaffected as state is applied in next tick
      [{ 1: 'initial-done' }, { 2: undefined }],
      // React Motion triggers another re-render on state change
      [{ 1: 'exit' }, { 2: undefined }],
      [{ 1: 'exit' }, { 2: 'enter-done' }],
      [{ 1: 'exit' }, { 2: 'enter-done' }],
    ]);
    step(61);
    expect(states[65]).toEqual([
      { 2: 'enter-done' },
    ]);
  });

  test('State is set to done (removed) without willLeave', () => {
    const states = [];
    class App extends React.Component {
      constructor() {
        super();

        this.state = {
          styles: [
            { key: '1', style: { a: 5 } },
          ],
        };
      }

      render() {
        const { styles } = this.state;
        return (
          <TransitionMotionState
            styles={styles}
          >
            {
              (interpolatedStyles) => {
                states.push(interpolatedStyles.map(({
                  key,
                  data: { transition },
                }) => ({
                  [key]: transition,
                })));
                return null;
              }
            }
          </TransitionMotionState>
        );
      }
    }

    const component = renderer.create(<App />).root;
    component.instance.setState({
      styles: [{ key: '2', style: { a: 5 } }],
    });
    step(2);
    expect(states).toEqual([
      [{ 1: 'initial-done' }],
      // React-motion triggers a re-render
      [{ 1: 'initial-done' }],
      // Transition is unaffected as state is applied in next tick
      [{ 2: undefined }],
      // React Motion triggers another re-render on state change
      [{ 2: undefined }],
      [{ 2: 'enter-done' }],
    ]);
  });

  test('Accepts styles as a function', () => {
    const states = [];
    renderer.create(
      <TransitionMotionState
        defaultStyles={[{ key: '1', style: { x: 0 } }]}
        styles={previousInterpolatedStyles => (
          previousInterpolatedStyles.map((styles, i) => ({
            key: styles.key,
            x: spring(i + 10),
          }))
        )}
      >
        {
          (interpolatedStyles) => {
            states.push(interpolatedStyles.map(({
              key,
              data: { transition },
            }) => ({
              [key]: transition,
            })));
            return null;
          }
        }
      </TransitionMotionState>,
    );

    expect(states).toEqual([
      [{ 1: 'initial' }],
    ]);
  });

  test('Raf callbacks are cancelled when unmounting', () => {
    const component = renderer.create(
      <TransitionMotionState
        defaultStyles={[{ key: '1', style: { a: 0 } }]}
        styles={[{ key: '1', style: { a: spring(5) } }]}
      >
        {
          () => null
        }
      </TransitionMotionState>,
    );

    const { instance } = component.root;
    const rafs = instance.styleRafs;
    expect(rafs).toEqual({ 1: 1 });
    instance.componentWillUnmount();
    expect(rafs).toEqual({});
  });
});
