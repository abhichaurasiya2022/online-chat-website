import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.scss';
import App from './unregisteredPage';
import Home from './Home';
import Test from './test';
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
    <Route path="/" element={<Home />} />
    <Route path="unregisteredPage" element={<App />} />
    <Route path="test" element={<Test />} />

  </Routes>
</BrowserRouter>,
rootElement
);


serviceWorker.unregister();
