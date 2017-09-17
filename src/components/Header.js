import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MDLite from 'material-design-lite'
import LoadingBar from 'react-redux-loading-bar'

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
            <LoadingBar style={{ backgroundColor: '#24AEF2', zIndex: '99999' }} />
            <div id='primary-menu-trigger'><i className='icon-reorder' /></div>
            <div id='logo' style={{ borderRight: 0 }}>
              <a href='/' className='standard-logo' data-dark-logo='/images/logo-dark.png'><img src='/images/logo_BETA.png' alt='sotec logo' /></a>
              <a href='/' className='retina-logo' data-dark-logo='/images/logo-dark@2x.png'><img src='/images/logo@2x_BETA.png' alt='sotec logo' /></a>
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
                  <li><a href='/login'>Login</a></li>
                  <li className='sub-menu'><a className='sf-with-ul'><div>Help</div></a>
                    <ul style={{display: 'none'}}>
                      <li><a href='/contact'><div><i className='icon-envelope-alt' />Contact</div></a></li>
                      <li><a href='/faq'><div><i className='icon-question' />FAQ</div></a></li>
                    </ul>
                  </li>
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
