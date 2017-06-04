import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Contact extends React.Component {

  static defaultProps = {
  }

  render () {
    const styleText = {textAlign: 'justify'}

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="sb-form-content sb-page" style={styleText}>
                        <h5>Connect with us</h5>
                        Email: contact@socialbank.co
                        Twitter: <a href="https://twitter.com/socialbankco"> @socialbankco</a>
                </div>
            </div>
            <Footer />
          </main>
        </div>
    )
  }

}

export default Contact
