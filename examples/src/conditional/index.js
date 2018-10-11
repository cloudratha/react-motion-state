import React from 'react';
import { storiesOf } from '@storybook/react';
import { spring } from 'react-motion';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import { ConditionalMotionState } from '../../../src';

storiesOf('ConditionalMotionState', module)
  .addDecorator(withKnobs)
  .add('Toast', () => {
    const inProp = boolean('In', true);
    return (
      <ConditionalMotionState
        in={inProp}
        defaultStyle={{
          bottom: 0,
          left: 50,
          width: 50,
          x: -50,
        }}
        onEnter={{
          width: spring(300),
          bottom: spring(50),
          left: spring(50),
          x: spring(-50),
        }}
        onExit={{
          left: spring(0),
          width: spring(50),
          bottom: spring(50),
          x: spring(0),
        }}
        unmountOnExit={boolean('UnmountOnExit', false)}
      >
        {
          (style, isAnimating) => (
            <div
              className="Conditional"
              style={{
                bottom: `${style.bottom}%`,
                left: `${style.left}%`,
                width: style.width,
                transform: `translateX(${style.x}%)`,
              }}
            >
              {isAnimating && inProp && 'entering'}
              {isAnimating && !inProp && 'exiting'}
              {!isAnimating && inProp && 'entered'}
              {!isAnimating && !inProp && 'exited'}
            </div>
          )
        }
      </ConditionalMotionState>
    );
  });
