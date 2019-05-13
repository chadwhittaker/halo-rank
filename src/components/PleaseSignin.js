import React from 'react';
import { Query } from 'react-apollo';

import { CURRENT_USER_QUERY } from './User';

const PleaseSignin = (props) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return (
          <div className="d-flex flex-column align-items-center">
            <div className="spinner-css spinner-grow text-info" role="status">
              <span className="sr-only"></span>
            </div>
            <p className="text-muted">In Masterchief we trust...</p>
          </div>
        )
        // if not signed in...show login form
        if (!data.me) {

        }
        // otherwise, return child component
        return props.children
      }}
    </Query>
  );
};

export default PleaseSignin;