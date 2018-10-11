import React from 'react';
import { storiesOf } from '@storybook/react';
import { spring } from 'react-motion';
import { withKnobs, select } from '@storybook/addon-knobs/react';

import { DirectionalMotionState } from '../../../src';

storiesOf('DirectionalMotionState', module)
  .addDecorator(withKnobs)
  .add('Button State', () => {
    const direction = select('Direction', {
      open: 'open',
      close: 'close',
    }, 'close');

    return (
      <div className="Directional">
        <DirectionalMotionState
          states={{
            close: {
              width: spring(5),
              height: spring(5),
              borderRadius: spring(50),
            },
            open: {
              width: spring(100),
              height: spring(100),
              borderRadius: spring(0),
            },
          }}
          direction={direction}
        >
          {
            (style, isAnimating) => (
              <button
                type="button"
                className="Directional__button"
                style={{
                  width: `${style.width}%`,
                  height: `${style.height}%`,
                  borderRadius: style.borderRadius,
                  backgroundColor: (isAnimating) ? 'green' : 'purple',
                }}
              >
                {isAnimating && direction === 'open' && 'entering'}
                {isAnimating && direction === 'close' && 'exiting'}
                {!isAnimating && direction === 'open' && 'entered'}
                {!isAnimating && direction === 'close' && 'exited'}
              </button>
            )
          }
        </DirectionalMotionState>
      </div>
    );
  });
