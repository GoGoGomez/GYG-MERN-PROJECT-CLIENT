import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import './styles/styles.css'
import store from './store'


const render = () => ReactDOM.render(<AppRouter />, document.getElementById('root'));
// registerServiceWorker();

store.subscribe(render);
render()