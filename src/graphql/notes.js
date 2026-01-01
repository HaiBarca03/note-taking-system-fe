import { gql } from "@apollo/client";

export const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(createNoteInput: $input) {
      id
      title
      group {
        id
        name
      }
    }
  }
`;

export const GET_NOTES_BY_GROUP = gql`
  query NotesByGroup($groupId: Int!) {
    notesByGroup(groupId: $groupId) {
      id
      title
      content
      createdAt
      isDeleted
    }
  }
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(updateNoteInput: $input) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const SHARE_NOTE_MUTATION = gql`
  mutation ShareNote($id: Int!, $permission: SharePermission!) {
    shareNote(id: $id, permission: $permission)
  }
`;

export const GET_SHARED_NOTE = gql`
  query SharedNote($token: String!) {
    sharedNote(token: $token) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_SHARED_NOTE = gql`
  mutation UpdateSharedNote($token: String!, $content: String!) {
    updateSharedNote(token: $token, content: $content) {
      id
      content
      updatedAt
    }
  }
`