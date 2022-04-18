import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.scss';
import Unreg from './unregisteredPage';
import Login from './login';
import Signup from './signup';
import Forgot from './forgot';
import App from './App';

import Call from './call';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
/*
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

const rootElement = document.getElementById("root");

render (
<BrowserRouter>
<Routes>
    <Route path="/" element={<App />} />
    <Route path="unregisteredPage" element={<Unreg />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="forgot" element={<Forgot />} />
    <Route path="call" element={<Call />} />


  </Routes>
</BrowserRouter>,
rootElement
);


serviceWorker.unregister();
