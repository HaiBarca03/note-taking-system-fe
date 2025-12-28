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

export const GET_GROUPS_QUERY_TRASK = gql`
  query GetGroups {
    groups(includeDeleted: true) {
      id
      name
      isDeleted
    }
  }
`;

export const GET_GROUPS_QUERY = gql`
  query GetGroups {
    groups(includeDeleted: false) {
      id
      name
    }
  }
`;

export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(updateGroupInput: $input) {
      id
      name
      isDeleted
    }
  }
`;

export const REMOVE_GROUP_MUTATION = gql`
  mutation RemoveGroup($id: Int!) {
    removeGroup(id: $id)
  }
`;
