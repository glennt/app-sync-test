import tree from '../state/tree';
import appSyncConfig from "../AppSync";
import AWSAppSyncClient from "aws-appsync";
import QueryAllEvents from '../graphQL/QueryAllEvents';
import MutationCreateEvent from '../graphQL/MutationCreateEvent';
import SubscriptionCreateEvent from '../graphQL/SubscriptionCreateEvent';
import uuid from 'uuid';
import _ from 'lodash';

const client = new AWSAppSyncClient({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey,
    }
});


export function loadEvents() {

    client.hydrated().then(function (c) {
        //Now run a query
        c.query({ query: QueryAllEvents , fetchPolicy: 'network-only'})
            .then((data) => {
                console.log('results of query: ', data);
                tree.set('events', data.data.listEvents.items);
            })
            .catch(console.error);
        
            const observable = client.subscribe({ query: SubscriptionCreateEvent });

            const realtimeResults = function realtimeResults(data) {
                console.log('realtime data: ', data);
                var event = data.data.subscribeToCreateEvent;
                delete event['__typename'];

                var arr = tree.select('events').get();
                var found = false;

                _.each(arr, (item) => {                 
                    if(item.id === event.id) found = true;
                })

                if(found === false) tree.select('events').push(event);
            };
        
            observable.subscribe({
                next: realtimeResults,
                complete: console.log,
                error: console.log,
            });

    });
}

export function createEvent(event) {

    client.hydrated().then(function (c) {
        //Now run a query

        event.id = uuid.v4();
        event['__typename'] = 'Event';
        event.comments = {};
        event.comments['__typename'] = 'CommentsConnection';
        event.comments.items = [];
        c.mutate({
            optimisticResponse: {
                '__typename': 'Mutation',
                event: event
            },
            mutation: MutationCreateEvent,
            variables: event,
            update: function (proxy, { data: { event } }) {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: QueryAllEvents });
                // Add our comment from the mutation to the end.
                data.listEvents.items.push(event);
                // Write our data back to the cache.
                proxy.writeQuery({ query: QueryAllEvents, data });


            }
        })
            .then(function logData(data) {
                console.log('results of mutation: ', data);
                tree.select('events').push(event);

            }).catch(console.error);
    });


}