import React from 'react'
import ContactForm from '../components/ContactForm'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Contact extends React.Component {

  render () {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <main className="mdl-layout__content">
            <ContactForm />
            <Footer />
          </main>
        </div>
    )
  }

}

export default Contact
