import gql from "graphql-tag";

export default gql(`
mutation($id: String! $name: String! $when: String! $where: String! $description: String!) {
  createEvent(
    id: $id
    name: $name
    when: $when
    where: $where
    description: $description
  ) {
    id
    name
    where
    when
    description
    comments {
      items {
        commentId
      }
    }
  }
}`);
