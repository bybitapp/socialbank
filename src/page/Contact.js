import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Contact extends React.Component {

  static defaultProps = {
  }

  render () {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="sb-form-content">
                    Contact
                </div>
            </div>
            <Footer />
          </main>
        </div>
    )
  }

}

export default Contact
