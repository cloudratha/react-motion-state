import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { version } from '../package.json';

import '../examples/src/App.css';

function loadStories() {
  require('../examples/src/motion/index.js');
  require('../examples/src/transition-motion/index.js');
  require('../examples/src/directional/index.js');
  require('../examples/src/conditional/index.js');
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