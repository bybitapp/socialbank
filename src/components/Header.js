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
          <div className='container clearfix' style={{ padding: 0 }}>
            <div id='primary-menu-trigger'><i className='icon-reorder' /></div>
            <div id='logo' style={{ borderRight: 0 }}>
              <a href='/' className='standard-logo' data-dark-logo='/images/logo-dark.png'><img src='/images/logo.png' alt='sotec logo' /></a>
              <a href='/' className='retina-logo' data-dark-logo='/images/logo-dark@2x.png'><img src='/images/logo@2x.png' alt='sotec logo' /></a>
            </div>
            <nav id='primary-menu' >
              {Auth.isUserAuthenticated() ? (
                <ul style={{ borderRight: 0 }}>
                  <li><Link to={'/me'}>Account</Link></li>
                  <li><Link to={'/contact'}>Contact</Link></li>
                  <li><Link to={'/logout'}>Logout</Link></li>
                </ul>
              ) : (
                <ul style={{ borderRight: 0 }}>
                  <li><Link to={'/contact'}>Contact</Link></li>
                  <li><a href='/login'>Login</a></li>
                  <li><Link style={{color: 'red'}} to={'/demo'}>Book a Demo</Link></li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default enhance(Header)
