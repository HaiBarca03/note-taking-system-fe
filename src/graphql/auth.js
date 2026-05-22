// src/graphql/auth.js
import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($data: AuthInput!) {
    login(data: $data) {
      access_token
      refresh_token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      access_token
      refresh_token
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      access_token
      refresh_token
    }
  }
`;
