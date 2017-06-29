import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MDLite from 'material-design-lite'

import NewsletterSubscribe from '../components/NewsletterSubscribe'
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
    const { modal, setModal } = this.props

    return (
      <header className='android-header mdl-layout__header mdl-layout__header--waterfall'>
        <div className='mdl-layout__header-row'>
          <span className='android-title mdl-layout-title'>
            <Link to={'/'}>SoTec</Link>
          </span>
          <div className='android-header-spacer mdl-layout-spacer'></div>
          <div className='android-navigation-container'>
            <nav className='android-navigation mdl-navigation'>
              <NewsletterSubscribe open={(modal === 'newsletterModal')} handleClose={() => setModal(null)}/>
              {Auth.isUserAuthenticated() ? (
                <div className='top-bar-right'>
                  <Link className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' to={'/me'}>
                    Account
                  </Link>
                  <Link className='mdl-navigation__link mdl-typography--text-uppercase' to={'/contact'}>Contact</Link>
                  <Link className='mdl-navigation__link mdl-typography--text-uppercase' to={'/logout'}>Logout</Link>
                  <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => setModal('newsletterModal')}>
                    Subscribe for updates
                  </button>
                </div>
              ) : (
                <div className='top-bar-right'>
                  <Link className='mdl-navigation__link mdl-typography--text-uppercase' to={'/contact'}>Contact</Link>
                  <Link className='mdl-navigation__link mdl-typography--text-uppercase' to={'/login'}>Login</Link>
                  {/*
                  <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to={'/registration'}>
                    Register
                  </Link>
                  */}
                  <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => setModal('newsletterModal')}>
                    Subscribe for updates
                  </button>
                </div>
              )}
            </nav>
          </div>
          <span className='android-mobile-title mdl-layout-title'>
            SoTec
          </span>
        </div>
      </header>
    )
  }
}

export default enhance(Header)
