import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'DESIGNCREATE',
  'DESIGNUPDATE',
  'DESIGNDELETE',
  'PERMISSIONUPDATE',
];

const Permissions = (props) => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <ErrorMessage error={error} />
        if (!error) {
          return (
            <div className="container">
              <h3 className="lead mt-4 mb-2">Mange User Permissions</h3>
              <ErrorMessage error={error} />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    {possiblePermissions.map((permission, i) => <th key={i} scope="col">{permission}</th>)}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user, i) => <UserPermissions key={i} user={user} i={i} />)}
                </tbody>
              </table>
            </div>
          )
        }
      }
      }
    </Query>
  );
};

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired,
  };

  // seed the state with permissions passed down from props
  // its only okay to use props in state when seeding initial data
  state = {
    permissions: this.props.user.permissions
  }

  handleChange = (e) => {
    const checkbox = e.target;
    // take a copy of current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      // remove it!
      updatedPermissions = updatedPermissions.filter((item) => item !== checkbox.value)
    }
    this.setState({ permissions: updatedPermissions })
  }

  render() {
    const { user, i } = this.props;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => {
          if (error) return <tr><td colSpan="8"><ErrorMessage error={error} /></td></tr>
          return (
            <tr key={user.id}>
              <td className="align-middle">{i + 1}</td>
              <td className="align-middle">{user.username}</td>
              {possiblePermissions.map((permission, i) => (
                <td className="permission-checkbox align-middle p-0" key={i}>
                  <label className="m-0" htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      value={permission}
                      checked={this.state.permissions.includes(permission)}
                      onChange={this.handleChange}
                    />
                  </label>
                </td>
              ))}
              <td><button onClick={updatePermissions} disabled={loading} className="btn btn-sm btn-primary">Updat{loading ? 'ing' : 'e'}</button></td>
            </tr>
          )
        }}
      </Mutation>
    )
  }
}

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      username
      permissions
    }
  }
`

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      username
      permissions
    }
  }
`

export default Permissions;
export { ALL_USERS_QUERY };