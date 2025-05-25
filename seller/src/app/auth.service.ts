import { gql } from '@apollo/client';
import { apolloClient } from './api';

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      email
      role
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      accessToken
      email
      role
    }
  }
`;

export async function signup(input) {
  const { data } = await apolloClient.mutate({
    mutation: SIGNUP_MUTATION,
    variables: { input },
  });
  return data.signup;
}

export async function signin(input) {
  const { data } = await apolloClient.mutate({
    mutation: SIGNIN_MUTATION,
    variables: { input },
  });
  return data.signin;
}
