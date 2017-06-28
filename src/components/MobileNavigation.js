import React from 'react'
import { Link } from 'react-router-dom'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Auth from '../modules/Auth'

const enhance = compose(
  connect((state) => {}),
  withState('modal', 'setModal')
)

class MobileNavigation extends React.Component {
  render () {
    const { modal, setModal } = this.props

    return (
      <div className="android-drawer mdl-layout__drawer">
        <span className="sb-layout-title">
          Menu
        </span>
        <nav className="mdl-navigation">
          <NewsletterSubscribe open={(modal === 'newsletterModal')} handleClose={() => setModal(null)}/>
          {!Auth.isUserAuthenticated() ? (
            <div>
              <Link className="mdl-navigation__link" to={'/login'}>Login</Link>
              <Link className="mdl-navigation__link" to={'/registration'}>Register</Link>
              <Link className="mdl-navigation__link" to={'/contact'}>Contact</Link>
              <a className="mdl-navigation__link" onClick={() => setModal('newsletterModal')}>
                Subscribe for updates
              </a>
            </div>
          ) : (
            <div>
              <Link className="mdl-navigation__link" to={'/contact'}>Contact</Link>
              <Link className="mdl-navigation__link" to={'/me'}>Account</Link>
              <Link className="mdl-navigation__link" to={'/logout'}>Logout</Link>
              <a className="mdl-navigation__link" onClick={() => setModal('newsletterModal')}>
                Subscribe for updates
              </a>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

export default enhance(MobileNavigation)
