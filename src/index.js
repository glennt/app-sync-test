import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/AppWithData';
import registerServiceWorker from './registerServiceWorker';
import { root } from 'baobab-react/higher-order';
import tree from './state/tree';
import appSyncConfig from "./AppSync";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";


const client = new AWSAppSyncClient({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
      type: appSyncConfig.authenticationType,
      apiKey: appSyncConfig.apiKey,
    }
  });

const RootedApp = root(tree, App);


ReactDOM.render(
    <ApolloProvider client={client}>
        <Rehydrated>
            <RootedApp/>
        </Rehydrated>
    </ApolloProvider>    
    , document.getElementById('root'));
registerServiceWorker();

