import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MotionStateView from './motion-state';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/motion-state" component={MotionStateView} />
    </Switch>
  </BrowserRouter>
);

ReactDom.render(<App />, document.getElementById('root'));
