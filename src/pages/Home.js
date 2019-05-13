import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
// import User from '../components/User';
// import { CURRENT_USER_QUERY } from './User';

import GamerPage from './GamerPage';

class Home extends Component {

  render() {
    return (
      <Query query={CURRENT_USER_QUERY} >
        {({ data, loading, error }) => {
          if (loading) return (
            <div className="d-flex flex-column align-items-center">
              <div className="spinner-css spinner-grow text-info" role="status">
                <span className="sr-only"></span>
              </div>
              <p className="">In Masterchief we trust...</p>
            </div>
          )
          if (!data.me) return (
            <div id="homepage" className="d-flex flex-column justify-content-center align-items-center vh-100">
              <h1 className="chad-heading display-4 text-center">The Original Halo Ranking System</h1>
              <hr className="chad-hr" />
              <div className="mt-4">
                <Link className="btn btn-dark" to="/login">Login</Link>
              </div>
              <h5 className="chad-heading my-3"> - OR -</h5>
              <div className="mb-4">
                <Link className="btn btn-dark" to="/signup">Link Your Gamertag</Link>
              </div>
            </div>
          )

          return (
            <div>
              <GamerPage myID={data.me.id} />
            </div>
          )
        }}
      </Query>
    );
  }
}

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      username
      gamertag
      admin
      friends {
        id
      }
    }
  }
`;

export default (Home);