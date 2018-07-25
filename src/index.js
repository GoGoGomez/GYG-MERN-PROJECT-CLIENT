import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import './styles/styles.css'
import store from './store'
import { saveState } from './components/LocalStorage'
import throttle from 'lodash/throttle';

const render = () => ReactDOM.render(<AppRouter />, document.getElementById('root'));
// registerServiceWorker();


store.subscribe(throttle(() => {
    saveState({
        order: store.getState().order
    });
}, 1000));

store.subscribe(render);
render()