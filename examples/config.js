import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { version } from '../package.json';

import './src/App.css';

function loadStories() {
  require('./src/motion/index.js');
  require('./src/transition-motion/index.js');
  require('./src/directional/index.js');
  require('./src/conditional/index.js');
}

addDecorator(
  withOptions({
    showDownPanel: false,
    name: `react-motion-state v${version}`,
    url: 'https://github.com/cloudratha/react-motion-state',
    sidebarAnimations: true,
    showAddonPanel: true,
  })
);

configure(loadStories, module);