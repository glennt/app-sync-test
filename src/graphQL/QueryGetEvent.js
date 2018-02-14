import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getEvent(id: $id) {
    id
    name
    where
    when
    description  
  }
}`);
