/* eslint-disable no-unused-expressions */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import DesignEditGhana from '../components/DesignEditGhana';
import { CURRENT_USER_QUERY } from '../components/User';
import LoginForm from '../pages/LoginForm';
import hasPermission from '../utils/hasPermission';
import ErrorMessage from '../components/ErrorMessage';



const DesignGhanaEditPage = (props) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading, error }) => {
        const currentUser = data.me;
        // console.log(data.me)
        if (loading) return <div>Loading...</div>
        if (!currentUser) {
          return (
            <div className="my-4">
              <div id="please-login2" className="alert alert-danger text-center">
                Please login to do that!
              </div>
              <LoginForm noRedirect="true" />
            </div>
          )
        } else {
          // 1. check if they have ADMIN or UPDATEDESIGN permission
          const { hasPermissionTrue } = hasPermission(data.me, ['ADMIN', 'DESIGNUPDATE']);
          if (hasPermissionTrue) {
            return <DesignEditGhana id={props.match.params.id} />
          } else {
            // 2. OR...check if they are the author of the design
            return (
              <Query query={CHECK_AUTHOR_QUERY} variables={{ id: props.match.params.id }}>
                {({ data, loading, error }) => {
                  if (loading) return <div>Loading...</div>
                  if (!data.design) return <div>No design found for ID</div>
                  if (error) return <ErrorMessage error={error} />

                  // if the current User is the Author...show Edit Page
                  if (data.design && currentUser.id === data.design.author.id) {
                    return <DesignEditGhana id={props.match.params.id} />
                  } else {
                    return (
                      <div className="alert alert-danger text-center mt-4">
                        <p>You do not have permission to edit this design!</p>
                        <p>Only the design author or an ADMIN has this permission.</p>
                      </div>
                    )
                  }
                }}
              </Query>
            )
          }
        }
      }}
    </Query>
  );
};

const CHECK_AUTHOR_QUERY = gql`
  query CHECK_AUTHOR_QUERY($id: ID) {
    design(id: $id) {
      id
      author {
        id
        username
      }
    }
  }
`


export default DesignGhanaEditPage;