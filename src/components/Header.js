import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MDLite from 'material-design-lite'

import Auth from '../modules/Auth'
import { sessionSetTemp } from '../actions'

function mapStateToProps (state) {
  const { account, projects } = state
  return {
    account,
    projects
  }
}

const enhance = compose(
  connect(mapStateToProps)
)
class Header extends React.Component {
  componentDidMount () {
    // TODO workaround to reload MDL
    if (MDLite) {
      // render material-design-lite
      global.componentHandler.upgradeDom()
    }

    const { dispatch } = this.props
    const user = Auth.getUser()
    if (user) {
      this.setState({ account: user.account })
      dispatch(sessionSetTemp(user))
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
                  <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/contact'}>Contact</Link>
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

export default enhance(Header)
