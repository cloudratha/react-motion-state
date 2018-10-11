import React from 'react';
import { storiesOf } from '@storybook/react';
import { spring } from 'react-motion';
import { withKnobs, number } from '@storybook/addon-knobs/react';

import { MotionState } from '../../../src';

storiesOf('MotionState', module)
  .addDecorator(withKnobs)
  .add('Emoji', () => (
    <MotionState
      defaultStyle={{ left: 0, top: 0 }}
      style={{
        left: spring(number('Left', 50)),
        top: spring(number('Top', 50)),
      }}
    >
      {
        (style, isAnimating) => (
          <div
            className="Emoji"
            style={{
              left: `${style.left}%`,
              top: `${style.top}%`,
            }}
          >
            <span className="Emoji__eye">.</span>
            <span className="Emoji__eye">.</span>
            <div className="Emoji__mouth">{isAnimating ? ')' : '('}</div>
          </div>
        )
      }
    </MotionState>
  ));
