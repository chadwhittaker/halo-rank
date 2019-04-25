import React from 'react';
import { Query } from 'react-apollo';

import LoginForm from '../pages/LoginForm';
import { CURRENT_USER_QUERY } from './User';

const PleaseSignin = (props) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({data, loading}) => {
        if(loading) return <p>Loading...</p>
        // if not signed in...show login form
        if(!data.me) {
          return (
            <div className="my-4">
              <div id="please-login" className="alert alert-danger text-center">
                Please login to do that!
              </div>
              <LoginForm noRedirect="true"/>
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