import React from 'react';
import ReactDOM from 'react-dom';
import './src/client/style/index.scss';
import App from './src/client/components/App';
import Provider from "react-redux/es/components/Provider";
import {BrowserRouter} from "react-router-dom";
import { createStore,applyMiddleware } from 'redux'
import bigReducer from "./src/client/reducers/index"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(bigReducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));


