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
