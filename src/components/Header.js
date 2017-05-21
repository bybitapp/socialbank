import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {

  static defaultProps = {
  }

  render () {
    const styleLogo = {paddingLeft: '15px'}

    return (
    <div className="android-header mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row">
          <span className="android-title mdl-layout-title">
            <Link to={'/'}>SocialBank</Link>
          </span>
          <div className="android-header-spacer mdl-layout-spacer"></div>
          <div className="android-navigation-container">
            <nav className="android-navigation mdl-navigation">
              <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/about'}>About</Link>
              <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/help'}>Help</Link>
              <Link className="mdl-navigation__link mdl-typography--text-uppercase" to={'/contact'}>Contact</Link>
            </nav>
          </div>
          <span className="android-mobile-title mdl-layout-title">
            SocialBank
          </span>
        </div>
    </div>
    )
  }

}

export default Header
