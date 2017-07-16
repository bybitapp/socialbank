import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MDLite from 'material-design-lite'

import Auth from '../modules/Auth'

function mapStateToProps (state) {
  const { account, projects } = state
  return {
    account,
    projects
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal')
)

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
      <header id='header' className='full-header'>
        <div id='header-wrap'>
          <div className='container clearfix'>
            <div id='primary-menu-trigger'><i className='icon-reorder' /></div>
            <div id='logo'>
              <a href='/' className='standard-logo' data-dark-logo='images/logo-dark.png'><img src='images/logo.png' alt='Canvas Logo' /></a>
              <a href='/' className='retina-logo' data-dark-logo='images/logo-dark@2x.png'><img src='images/logo@2x.png' alt='Canvas Logo' /></a>
            </div>
            <nav id='primary-menu' >
              <ul>
                <li>
                  <Link to={'/contact'}>Contact</Link>
                </li>
                {Auth.isUserAuthenticated() ? (
                  <li>
                    <Link to={'/logout'}>Logout</Link>
                  </li>
                ) : (
                  <div>
                    <li>
                      <Link to={'/login'}>Login</Link>
                    </li>
                    <li>
                      <Link to={'/register'}>Register</Link>
                    </li>
                  </div>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default enhance(Header)
