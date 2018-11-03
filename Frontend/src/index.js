import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

// import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

import App from './App';

import './index.css';


/*
first run: npm install -g json-server
run following script in terminal to START SERVER:  json-server --watch db.json */


const store = createStore(reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>

  ,document.getElementById('root')
);
serviceWorker.unregister();
