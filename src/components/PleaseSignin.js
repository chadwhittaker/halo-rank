import React from 'react';
import { Query } from 'react-apollo';

import LoginForm from './LoginForm';
import { CURRENT_USER_QUERY } from './User';

const PleaseSignin = (props) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({data, loading, refetch}) => {
        if(loading) return <p>Loading...</p>
        // if not signed in...show login form
        if(!data.me) {
          return (
            <div className="my-4">
              <div className="alert alert-danger text-center">
                Please sign in to do that!
              </div>
              <LoginForm />
            </div>
          )
        }
        // otherwise, return child component
        return props.children
      }}
    </Query>
  );
};

export default PleaseSignin;