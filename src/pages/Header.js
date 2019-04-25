import React from 'react';
import { Link } from 'react-router-dom';

import User from '../components/User';
import LogoutButton from '../components/LogoutButton';

const Header = () => {
  return (

    <div>
      <nav id="navbar" className="navbar fixed-top navbar-expand-md navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/images/just-AEG-logo.png" alt="Logo" className="m-0 p-0" id="logo-header" />
          </Link>
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
                          <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="/" id="navbarSolarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            New Design
                              </a>
                          <div className="dropdown-menu" aria-labelledby="navbarSolarDropdown">
                            <Link className="dropdown-item" to="/">Generic Design</Link>
                            <Link className="dropdown-item" to="/ghana/designs/new">Ghana Design</Link>
                          </div>
                        </li> */}
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="/" id="navbarProjectDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ghana Project
                              </a>
                          <div className="dropdown-menu" aria-labelledby="navbarProjectDropdown">
                            <Link className="dropdown-item" to="/ghana/designs/new">New Design</Link>
                            <Link className="dropdown-item" to="/ghana/designs">View Designs</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">Overview</Link>
                            <Link className="dropdown-item" to="#">Reference Designs</Link>
                            <Link className="dropdown-item" to="#">Partners</Link>
                            <Link className="dropdown-item" to="#">About Us</Link>
                          </div>
                        </li>
                      </ul>
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link className="btn btn-outline-danger mr-2" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="btn btn-danger" to="/login">Login</Link>
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
                          <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="/" id="navbarSolarDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            New Design
                              </a>
                          <div className="dropdown-menu" aria-labelledby="navbarSolarDropdown">
                            <Link className="dropdown-item" to="/">Generic Design</Link>
                            <Link className="dropdown-item" to="/ghana/designs/new">Ghana Design</Link>
                          </div>
                        </li> */}
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="/" id="navbarProjectDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ghana Project
                              </a>
                          <div className="dropdown-menu" aria-labelledby="navbarProjectDropdown">
                            <Link className="dropdown-item" to="/ghana/designs/new">New Design</Link>
                            <Link className="dropdown-item" to="/ghana/designs">View Designs</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">Overview</Link>
                            <Link className="dropdown-item" to="#">Reference Designs</Link>
                            <Link className="dropdown-item" to="#">Partners</Link>
                            <Link className="dropdown-item" to="#">About Us</Link>
                            {payload.data.me.permissions.includes('ADMIN') && (
                              <Link className="dropdown-item" to="/permissions">Permissions</Link>
                            )}
                          </div>
                        </li>
                      </ul>

                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <span id="login-name" className="navbar-text mr-2">Hi, {payload.data.me.username}!</span>
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
      {/* <User>
        {(payload) => {
          if (!payload.data.me || !payload.data || !payload) {
            return (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="btn btn-outline-danger mr-2" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-danger" to="/login">Login</Link>
                </li>
              </ul>
            )
          } else if (payload.data.me) {
            return (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <span id="login-name" className="navbar-text mr-2">Hi, {payload.data.me.username}!</span>
                </li>
                <li className="nav-item">
                  <LogoutButton />
                </li>
              </ul>
            )
          }
        }}
      </User>
    </div>
    </div >
      </nav > */}
      <div id="fixed-margin"></div>
    </div >
  );
};

export default Header;