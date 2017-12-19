import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import Root from './Router/Router';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';


const loggerMiddleware = createLogger();

const store = createStore(reducers, compose(applyMiddleware(
    thunk, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
)));

ReactDOM.render(<Router><Root store={store} /></Router>, document.getElementById('root'));
registerServiceWorker();

console.log(store.getState());
