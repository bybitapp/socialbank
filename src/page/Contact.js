import React from 'react'

import ContactForm from '../components/ContactForm'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Contact extends React.Component {
  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title'>
          <div className='container clearfix'>
            <h1>Contact us</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Contact us</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <ContactForm />
              <div className='sidebar col_last nobottommargin'>
                <abbr title='Phone Number'><strong>Phone:</strong></abbr> +44 7437 893 938<br />
                <abbr title='Email Address'><strong>Email:</strong></abbr> contact@sotec.io
                <div className='widget noborder notoppadding'>
                  <a href='https://www.facebook.com/SoTecUK' target='_blank' rel='noopener noreferrer' className='social-icon si-small si-dark si-facebook'>
                    <i className='icon-facebook' />
                    <i className='icon-facebook' />
                  </a>
                  <a href='https://twitter.com/SoTec_UK' target='_blank' rel='noopener noreferrer' className='social-icon si-small si-dark si-twitter'>
                    <i className='icon-twitter' />
                    <i className='icon-twitter' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Contact
