import React from 'react'

import NotFound from '../components/NotFound'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Contact extends React.Component {
  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <NotFound />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Contact
