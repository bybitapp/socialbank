import React from 'react'

class Footer extends React.Component {

  static defaultProps = {
  }

  render () {
    return (
        <footer class="android-footer mdl-mega-footer">
            <div className="mdl-mini-footer__left-section">
              <div className="mdl-logo">Title</div>
              <ul className="mdl-mini-footer__link-list">
                <li><a className="android-link" href="/help">Help</a></li>
                <li><a className="android-link" href="/terms">Privacy & Terms</a></li>
                <li><a className="android-link" href="/contact">Contact</a></li>
              </ul>
            </div>
        </footer>
    )
  }

}

export default Footer
