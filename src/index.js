import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { root } from 'baobab-react/higher-order';
import tree from './state/tree';
import appSyncConfig from "./AppSync";
import AWSAppSyncClient from "aws-appsync";

const RootedApp = root(tree, App);


const client = new AWSAppSyncClient({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey,
    }
});




ReactDOM.render(<RootedApp />, document.getElementById('root'));
registerServiceWorker();
