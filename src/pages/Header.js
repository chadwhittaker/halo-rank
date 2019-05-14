import React from 'react';
import { Link } from 'react-router-dom';

import User from '../components/User';
import LogoutButton from '../components/LogoutButton';

const Header = () => {
  return (
    <nav id="navbar" className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <img src="/images/halo_logo_2.png" alt="Logo" className="m-0 p-0" id="logo-header" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <User>
          {(payload) => {
            // if no user
            if (!payload.data.me || !payload.data || !payload) {
              return (
                <>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="btn btn-outline-info mr-2" to="/signup">Sign Up</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="btn btn-info" to="/login">Login</Link>
                      </li>
                    </ul>
                  </div>
                </>
              )
            } else if (payload.data.me) {
              // if logged in show this!
              return (
                <>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <span id="login-name" className="navbar-text text-info mr-2">Hi, {payload.data.me.gamertag}!</span>
                      </li>
                      <li className="nav-item">
                        <LogoutButton />
                      </li>
                    </ul>
                  </div>
                </>
              )
            }
          }}
        </User>
      </div>
    </nav>
  );
};

export default Header;