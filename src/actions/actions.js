import tree from '../state/tree';
import appSyncConfig from "../AppSync";
import AWSAppSyncClient from "aws-appsync";
import QueryAllEvents from '../graphQL/QueryAllEvents';
import MutationCreateEvent from '../graphQL/MutationCreateEvent';


const client = new AWSAppSyncClient({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey,
    }
});


export function loadEvents() {

    client.hydrated().then(function (client) {
        //Now run a query
        client.query({ query: QueryAllEvents })
            .then(function logData(data) {
                console.log('results of query: ', data);
                tree.set('events', data.data.listEvents.items);
            })
            .catch(console.error);
    });
}

export function createEvent(event) {

    client.hydrated().then(function (client) {
        //Now run a query
        client.mutate({
                mutation: MutationCreateEvent,
                variables: event,
                update: function (proxy, { data: { event } }) {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: QueryAllEvents });
                // Add our comment from the mutation to the end.
                data.events.push(event);
                // Write our data back to the cache.
                proxy.writeQuery({ query: QueryAllEvents, data });
                }})
                .then(function logData(data) {
                    console.log('results of mutation: ', data);
                }).catch(console.error);
    });


}