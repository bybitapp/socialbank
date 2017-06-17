import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth'
import MDLite from 'material-design-lite'

class Header extends React.Component {

  componentDidMount () {
    // TODO workaround to reload MDL
    if (MDLite) {
      // render material-design-lite
      global.componentHandler.upgradeDom()
    }
  }

  render () {
    return (
      <header className="android-header mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row">
          <span className="android-title mdl-layout-title">
            <Link to={'/'}>SocialBank</Link>
          </span>
          <div className="android-header-spacer mdl-layout-spacer"></div>
          <div className="android-navigation-container">
            <nav className="android-navigation mdl-navigation">
              {Auth.isUserAuthenticated() ? (
                <div className="top-bar-right">
                  <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to={'/me'}>
                    Account
                  </Link>
                  <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/logout'}>Logout</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/contact'}>Contact</Link>
                  <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/login'}>Login</Link>
                  <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to={'/registration'}>
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
          <span className="android-mobile-title mdl-layout-title">
            SocialBank
          </span>
        </div>
      </header>
    )
  }
}

export default Header
