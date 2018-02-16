import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { root } from 'baobab-react/higher-order';
import tree from './state/tree';
import {initClient} from './actions/actions';

const RootedApp = root(tree, App);

initClient().then(() => {
    ReactDOM.render(<RootedApp />, document.getElementById('root'));
    registerServiceWorker();
});
