import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const LogoutButton = props => (
  <Mutation mutation={LOGOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {logout => <button onClick={logout} className="btn btn-info">Logout</button>}
  </Mutation>
);

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;

export default LogoutButton;
