// src/graphql/auth.js
import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($data: AuthInput!) {
    login(data: $data) {
      access_token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      access_token
    }
  }
`;
