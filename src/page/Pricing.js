import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

const PremiumBox = () => (
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
)

const PopularBox = () => (
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
)

const CharityBox = () => (
  <div className='pricing-box best-price'>
    <div className='pricing-title'>
      <h3>CHARITIES & NON-PROFIT</h3>
    </div>
    <div className='pricing-price'>
      FREE
      <div><span className='price-tenure'>{`we're happy to help you :)`}</span></div>
    </div>
    <div className='pricing-features'>
      <ul>
        <li><strong>Full</strong> Access</li>
        <li>Accounting integrations</li>
        <li><strong>24/7</strong> customer support</li>
      </ul>
    </div>
    <div className='pricing-action'>
      <a href='/demo' className='btn btn-danger btn-block btn-lg bgcolor border-color'>TRY IT OUT!</a>
    </div>
  </div>
)

const BetaBox = () => (
  <div className='pricing-box best-price'>
    <div className='pricing-title'>
      <h3>BETA Pricing</h3>
    </div>
    <div className='pricing-price'>
      FREE
      <div><span className='price-tenure'>{`SOTEC is beta right now. So it's free to use :)`}</span></div>
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
)

const BetaPricing = () => (
  <div className='mdl-grid'>
    <div className='mdl-layout-spacer' />
    <div className='col-sm-4'>
      <BetaBox />
    </div>
    <div className='mdl-layout-spacer' />
  </div>
)

const ReleasePricing = () => (
  <div>
    <div className='col-sm-1' />
    <div className='col-sm-3'>
      <CharityBox />
    </div>
    <div className='col-sm-1' />
    <div className='col-sm-3'>
      <PopularBox />
    </div>
    <div className='col-sm-1' />
    <div className='col-sm-3'>
      <PremiumBox />
    </div>
  </div>
)

class Pricing extends React.Component {
  render () {
    const isBeta = true
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
                {isBeta
                  ? <BetaPricing />
                  : <ReleasePricing />}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }
}

export default Pricing
