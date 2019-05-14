import React, { Component } from 'react';

class AuthForm extends Component {
  state = { username: "", password: "" }

  handleSubmit = (e) => {
    e.preventDefault();

    // grab username & password from state
    const { username, password } = this.state;
    // pass variables to onSubmit function from parent
    this.props.onSubmit({ username, password });
  }

  render() {
    return (
      <div id="auth-form-div">
        <form id="auth-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username-input">Username:</label>
            <input
              id="username-input"
              className="form-control"
              type="text"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-input">Password:</label>
            <input
              id="password-input"
              className="form-control"
              type="text"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <button type="button" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;