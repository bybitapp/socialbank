import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Faq extends React.Component {
  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title'>
          <div className='container clearfix'>
            <h1>Start Your 60-Day Free Trial</h1>
            <span>No upfront setup costs, long-term commitments or complicated extra fees.</span>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Pricing</li>
            </ol>
          </div>
        </section>

        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='pricing bottommargin clearfix'>
                <div className='col-sm-2' />
                <div className='col-sm-4'>
                  <div className='pricing-box best-price'>
                    <div className='pricing-title'>
                      <h3>MOST POPULAR PACKAGE</h3>
                    </div>
                    <div className='pricing-price'>
                      <span className='price-unit'>£</span>5
                      <div><span className='price-tenure'>per active user per month</span></div>
                    </div>
                    <div className='pricing-features'>
                      <ul>
                        <li><strong>Full</strong> Access</li>
                        <li>Accounting integrations</li>
                        <li><strong>24/7</strong> customer support</li>
                      </ul>
                    </div>
                    <div className='pricing-action'>
                      <a href='/demo' className='btn btn-danger btn-block btn-lg bgcolor border-color'>GET 60-DAY FREE</a>
                    </div>
                  </div>
                </div>
                <div className='col-sm-2' />
                <div className='col-sm-4'>
                  <div className='pricing-box'>
                    <div className='pricing-title'>
                      <h3>PREMIUM</h3>
                    </div>
                    <div className='pricing-price'>
                      <span className='price-unit'>Contact Us</span>
                    </div>
                    <div className='pricing-features'>
                      <ul>
                        <li><strong>Unlimited</strong> active users</li>
                        <li>All features</li>
                        <li>Dedicated support</li>
                      </ul>
                    </div>
                    <div className='pricing-action'>
                      <a href='/demo' className='btn btn-danger btn-block btn-lg'>BOOK A DEMO</a>
                    </div>
                  </div>
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

export default Faq
