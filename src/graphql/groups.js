import { gql } from "@apollo/client";

export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(createGroupInput: $input) {
      id
      name
      userId
    }
  }
`;

export const GET_GROUPS_QUERY = gql`
  query GetGroups {
    groups {
      id
      name
    }
  }
`;
