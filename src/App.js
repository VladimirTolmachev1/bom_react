import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';

import HTML5Backend from 'react-dnd-html5-backend';

import { DragDropContext } from 'react-dnd';
import { history } from './store/configureStore';
import { Router as Root } from './scenes';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

export default
@DragDropContext(HTML5Backend)
@hot(module)
class App extends Component {
  componentDidMount() {
    const loader = document.querySelector('body > .loader');
    loader && loader.remove();
  }

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <>
          <ConnectedRouter history={history}>
            <Root />
          </ConnectedRouter>
        </>
      </JssProvider>
    );
  }
}
