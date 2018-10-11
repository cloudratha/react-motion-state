import React from 'react';
import renderer from 'react-test-renderer';
import { spring } from 'react-motion';

import MotionState from '..';
import { reset, step } from 'raf';


describe('MotionState', () => {
  beforeEach(() => {
    jest.mock('raf');
    reset();
  });

  test('State updates when in motion', () => {
    const states = [];
    renderer.create(
      <MotionState
        defaultStyle={{ a: 0 }}
        style={{ a: spring(5) }}
      >
        {
          ({ a }, isAnimating) => {
            states.push({ [a]: isAnimating });
            return null;
          }
        }
      </MotionState>,
    );

    expect(states).toEqual([{ 0: true }]);

    step(62);
    expect(states).toHaveLength(63);
    expect(states[62]).toEqual({ 5: false });
  });

  test('Changes states between prop changes', () => {
    const animating = [];
    class App extends React.Component {
      constructor() {
        super();

        this.state = {
          a: spring(5), // eslint-disable-line react/no-unused-state
        };
      }

      render() {
        return (
          <MotionState
            defaultStyle={{ a: 0 }}
            style={this.state}
          >
            {
              (style, isAnimating) => {
                if (animating.slice(-1)[0] !== isAnimating) {
                  animating.push(isAnimating);
                }
                return null;
              }
            }
          </MotionState>
        );
      }
    }

    const component = renderer.create(<App />);
    step(62);
    expect(animating).toEqual([true, false]);
    component.root.instance.setState({ a: spring(0) });
    step(62);
    expect(animating).toEqual([true, false, true, false]);
  });

  test('Initial animating state is false when no defaultStyle', () => {
    const states = [];
    renderer.create(
      <MotionState
        style={{ a: spring(5) }}
      >
        {
          ({ a }, isAnimating) => {
            states.push({ [a]: isAnimating });
            return null;
          }
        }
      </MotionState>,
    );

    expect(states).toEqual([{ 5: false }]);
    step(5);
    expect(states).toEqual([{ 5: false }]);
  });

  test('Calls onRest Prop at rest', () => {
    const states = [];
    const onRest = jest.fn();
    renderer.create(
      <MotionState
        defaultStyle={{ a: 0 }}
        style={{ a: spring(5) }}
        onRest={onRest}
      >
        {
          ({ a }, isAnimating) => {
            states.push({ [a]: isAnimating });
            return null;
          }
        }
      </MotionState>,
    );

    step(62);
    expect(onRest).toBeCalledTimes(1);
  });
});
