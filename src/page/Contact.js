import React from 'react'

import ContactInfo from '../components/ContactInfo'
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
            <ContactInfo styleText={styleText}/>
            <Footer />
          </main>
        </div>
    )
  }

}

export default Contact
