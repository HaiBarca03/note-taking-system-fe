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

export const SHARE_GROUP_MUTATION = gql`
  mutation ShareGroup($id: Int!, $permission: SharePermission!) {
    shareGroup(id: $id, permission: $permission)
  }
`;

export const GET_SHARED_GROUP_QUERY = gql`
  query SharedGroup($token: String!) {
    sharedGroupByToken(token: $token) {
      id
      name
      notes {
        id
        title
        content
        createdAt
        updatedAt
      }
      user {
        email
      }
    }
  }
`;

export const GET_SHARED_NOTE_IN_GROUP_QUERY = gql`
  query SharedNoteInGroup($token: String!, $noteId: Int!) {
    sharedNoteInGroup(token: $token, noteId: $noteId) {
      id
      title
      content
      createdAt
      updatedAt
      group {
        id
        name
      }
    }
  }
`;

export const GROUP_SHARE_PERMISSION_QUERY = gql`
  query GroupSharePermission($token: String!) {
    groupSharePermission(token: $token)
  }
`;

export const UPDATE_NOTE_IN_SHARED_GROUP_MUTATION = gql`
  mutation UpdateNoteInSharedGroup($token: String!, $noteId: Int!, $content: String!) {
    updateNoteInSharedGroup(token: $token, noteId: $noteId, content: $content) {
      id
      content
      updatedAt
    }
  }
`;
