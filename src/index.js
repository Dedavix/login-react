import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Home from './components/Home';
import * as serviceWorker from './utils/serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
