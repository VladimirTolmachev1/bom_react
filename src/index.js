import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import configureStore from './store/configureStore';
import App from './App';

import 'rc-time-picker/assets/index.css';
import './styles/index.scss';

// import registerServiceWorker from './registerServiceWorker';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root'),
);

// registerServiceWorker();
