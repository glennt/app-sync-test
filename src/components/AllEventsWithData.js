import React, { Component } from "react";

import { graphql, compose } from "react-apollo";
import QueryAllEvents from "../graphQL/QueryAllEvents";
import MutationCreateEvent from "../graphQL/MutationCreateEvent";
import AllEvents from './AllEvents';
import tree from '../state/tree';
import uuid from 'uuid';

export default compose(
    graphql(
        QueryAllEvents,
        {
            options: {
                fetchPolicy: 'network-only',
            },        
            props: ({ data: { listEvents = { items: [] } } }) => {
                tree.select('events').set(listEvents.items)
                return {};
            }
        }
    ),
    graphql(
        MutationCreateEvent,
        {
            options: {
                refetchQueries: [{ query: QueryAllEvents }],
                update: (proxy, { data: { createEvent } }) => {
                    const query = QueryAllEvents;
                    const data = proxy.readQuery({ query });
    
                    data.listEvents.items.push(createEvent);
    
                    proxy.writeQuery({ query, data });
                }
            },
            props: (props) => ({
                createEvent: (event) => {
                    return props.mutate({
                        variables: event,
                        optimisticResponse: () => ({
                            createEvent: {
                                ...event, id: uuid(), __typename: 'Event', comments: { __typename: 'CommentConnection', items: [] }
                            }
                        }),
                    })
                }
            })
        }
    )    
)(AllEvents);
