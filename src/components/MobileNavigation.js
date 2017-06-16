import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../modules/Auth'

class MobileNavigation extends React.Component {
  render () {
    return (
      <div className="android-drawer mdl-layout__drawer">
        <span className="sb-layout-title">
          Menu
        </span>
        <nav className="mdl-navigation">
          {Auth.isUserAuthenticated() ? (
            <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/logout'}>Logout</Link>
          ) : (
            <div>
              <Link className="mdl-navigation__link" to={'/login'}>Login</Link>
              <Link className="mdl-navigation__link" to={'/registration'}>Register</Link>
            </div>
          )}
          <Link className="mdl-navigation__link" to={'/contact'}>Contact</Link>
        </nav>
      </div>

    )
  }
}

export default MobileNavigation
