import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { spring } from 'react-motion';

import { TransitionMotionState } from '../../../src';

storiesOf('TransitionMotionState', module)
  .addDecorator(withKnobs)
  .add('Reveal', () => {
    const willEnter = object('WillEnter', { x: 0 });
    const willLeave = object('WillLeave', { x: spring(0) });
    return (
      <TransitionMotionState
        defaultStyle={object('DefaultStyle', [
          {
            key: 'one',
            style: { x: 0 },
          },
          {
            key: 'two',
            style: { x: 0 },
          },
        ])}
        styles={object('Styles', [
          {
            key: 'one',
            data: { text: 'Item 1' },
            style: { x: spring(50) },
          },
          {
            key: 'two',
            data: { text: 'Item 2' },
            style: { x: spring(50) },
          },
        ])}
        willEnter={null}
        willLeave={() => willLeave}
      >
        {
          interploatedStyles => (
            <ul className="Reveal">
              {
                interploatedStyles.map(config => (
                  <li key={config.key} className="Reveal__item" style={{ transform: `translateX(${config.style.x}vw)` }}>
                    {config.data.transition}
                  </li>
                ))
              }
            </ul>
          )
        }
      </TransitionMotionState>
    );
  });
