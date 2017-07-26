import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import NewsletterSubscribe from '../components/NewsletterSubscribe'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import CookieBanner from '../components/CookieBanner'
import { Link } from 'react-router-dom'

function mapStateToProps (state) {
  return {}
}

const enhance = compose(
  connect(mapStateToProps)
)

const TopView = () => (
  <section id='slider' className='slider-parallax full-screen'>
    <div className='full-screen' style={{backgroundSize: 'cover'}}>
      <div className='container clearfix'>
        <img src='images/mobile_app.png' alt='' className='hidden-sm hidden-xs' data-style-lg='position: absolute; left: 0; bottom: 0; height: auto;' data-style-md='position: absolute; left: 0; bottom: 0; height: 450px;' />
        <div className='vertical-middle no-fade'>
          <div className='col-md-6 fright nobottommargin' data-animate='fadeIn'>
            <div className='emphasis-title'>
              <h1 data-style-lg='font-size: 52px;' data-style-md='font-size: 44px;'>Revolutionize the way your <strong style={{ color: '#00D0A7' }}>charity</strong> manages its expenses.</h1>
            </div>
            <div>
              <Link to={'/register'} className='button button-desc button-border button-rounded nomargin'>
                <div>Create your account</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Description = () => (
  <div className='container clearfix'>
    <div className='row topmargin-lg bottommargin-sm'>
      <div className='heading-block center'>
        <h2>Why do you need sotec?</h2>
        <span className='divcenter'>The system is dedicated to helping non-profit and charity organizations build transparency and trust around payments.</span>
      </div>
      <div className='col-md-4 col-sm-6 bottommargin'>
        <div className='feature-box fbox-right topmargin' data-animate='fadeIn'>
          <div className='fbox-icon'>
            <a href=''><i className='icon-home' /></a>
          </div>
          <h3>Controlled</h3>
          <p>Freeze cards and set spending limits. Maintain control of your money.</p>
        </div>
        <div className='feature-box fbox-right topmargin' data-animate='fadeIn' data-delay='200'>
          <div className='fbox-icon'>
            <a href=''><i className='icon-diamond' /></a>
          </div>
          <h3>Secure</h3>
          <p>Lock card whenever you want, making them useless to buy.</p>
        </div>
        <div className='feature-box fbox-right topmargin' data-animate='fadeIn' data-delay='400'>
          <div className='fbox-icon'>
            <a href=''><i className='icon-credit-cards' /></a>
          </div>
          <h3>Cards Management</h3>
          <p>Easily keep track of multiple cards.</p>
        </div>
      </div>
      <div className='col-md-4 hidden-sm topmargin-lg bottommargin center'>
        <img src='images/credit_card/card_sample.png' alt='iphone 2' />
      </div>
      <div className='col-md-4 col-sm-6 bottommargin'>
        <div className='feature-box topmargin' data-animate='fadeIn'>
          <div className='fbox-icon'>
            <a href=''><i className='icon-wallet' /></a>
          </div>
          <h3>Private</h3>
          <p>Share charity spending only. Keep sensitive information safe and private.</p>
        </div>
        <div className='feature-box topmargin' data-animate='fadeIn' data-delay='200'>
          <div className='fbox-icon'>
            <a href=''><i className='icon-lock' /></a>
          </div>
          <h3>Disposable</h3>
          <p>Delete unneeded cards anytime and forget about unused subscriptions.</p>
        </div>
        <div className='feature-box topmargin' data-animate='fadeIn' data-delay='400'>
          <div className='fbox-icon'>
            <a href=''><i className='icon-download2' /></a>
          </div>
          <h3>Easy reporting</h3>
          <p>Download your transaction history to easily track your spending.</p>
        </div>
      </div>
    </div>
  </div>
)

const Explainer = () => (
  <div className='row clearfix common-height'>
    <div className='col-md-6 center col-padding' style={{ background: 'url("images/explainer.jpg") center center no-repeat', backgroundSize: 'cover' }}>
      <div>&nbsp;</div>
    </div>
    <div className='col-md-6 center col-padding' style={{ backgroundColor: '#F5F5F5' }}>
      <div>
        <div className='heading-block nobottomborder'>
          <span className='before-heading color'>Easily Understandable &amp; Customizable.</span>
          <h3>Walkthrough Videos &amp; Demos</h3>
        </div>
        <div className='center bottommargin'>
          <a href='https://www.youtube.com/watch?v=kX2PiKgkr-Y' data-lightbox='iframe' style={{ position: 'relative' }}>
            <img src='images/new/video.jpg' alt='Video' />
            <span className='i-overlay nobg'><img src='images/new/video-play.png' alt='Play' /></span>
          </a>
        </div>
        <p className='lead nobottommargin'>Transform your donations into philanthropy by seeing their impact.</p>
      </div>
    </div>
  </div>
)

const WhatSays = () => (
  <div className='section parallax dark notopmargin nobottommargin' style={{ backgroundImage: 'url("images/new/home-testi-bg.jpg")', padding: '100px 0' }} data-stellar-background-ratio='0.4'>
    <div className='heading-block center'>
      <h3>What others say about sotec</h3>
    </div>
    <div className='fslider testimonial testimonial-full' data-animation='fade' data-arrows='false'>
      <div className='flexslider'>
        <div className='slider-wrap'>
          <div className='slide'>
            <div className='sb-testi-image'>
              <a href='https://www.ixaris.com/sotec-wins-ixaris-b2b-innovation-challenge/' target='_blank' rel='noopener noreferrer'><img src='images/logos/ixaris.png' alt='Customer Testimonails' /></a>
            </div>
            <div className='testi-content'>
              <p style={{ fontSize: '24px' }}>Love the idea behind SoTec and ready to roll up sleeves to get this little beauty to market Team @SoTec_UK Wins OPCLive!</p>
              <div className='testi-meta'>
                Alex Mifsud
                <span>CEO of Ixaris</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const HowStart = () => (
  <div className='section dark notopmargin' style={{ paddingTop: '60px' }}>
    <div className='container clearfix'>
      <div className='heading-block center'>
        <h2>Getting started with sotec</h2>
        <span>Learn how to manage your charity’s spending</span>
      </div>
      <div className='clear bottommargin-sm' />
      <div className='col_one_fourth nobottommargin'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <a href=''><i className='i-alt noborder icon-wallet' /></a>
          </div>
          <h3>Create an account<span className='subtitle'>Create an account and set up your organisation</span></h3>
        </div>
      </div>
      <div className='col_one_fourth nobottommargin'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <a href=''><i className='i-alt noborder icon-money' /></a>
          </div>
          <h3>Add money to projects<span className='subtitle'>Transfer money from your bank account to your projects</span></h3>
        </div>
      </div>
      <div className='col_one_fourth nobottommargin'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <a href=''><i className='i-alt noborder icon-user' /></a>
          </div>
          <h3>Distribute cards<span className='subtitle'>Transfer money to people involved in your projects</span></h3>
        </div>
      </div>
      <div className='col_one_fourth nobottommargin col_last'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <a href=''><i className='i-alt noborder icon-shop' /></a>
          </div>
          <h3>Start spending<span className='subtitle'>Use your SoTec card to pay anyone, anywhere (even contactless!)</span></h3>
        </div>
      </div>
    </div>
  </div>
)

class Home extends React.Component {
  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <TopView />
        <section id='content'>
          <div className='content-wrap'>
            <Description />
            <Explainer />
            <WhatSays />

            <div className='section notopmargin nobottommargin' style={{paddingBottom: '150px'}}>
              <div className='hidden-sm hidden-xs' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent url("images/new/ipad-section.png") bottom right no-repeat' }} />
              <div className='container clearfix' style={{ zIndex: 1 }}>
                <div className='col-md-6 nobottommargin'>
                  <div className='heading-block topmargin-sm'>
                    <h2>Real-time spending overview</h2>
                    <span>Monitor your charity’s spending in real-time and sync it to your accounting system.</span>
                  </div>
                  <Link to={'/register'} className='button button-border button-rounded button-large button-dark noleftmargin'>Start Demo</Link>
                </div>
              </div>
            </div>

            <HowStart />
            <NewsletterSubscribe />

            <div id='section-buy' className='section page-section footer-stick'>
              <div className='container clearfix'>
                <div className='heading-block title-center nobottomborder'>
                  <h2>Enough? Start Building!</h2>
                  <span>Now that you’ve read all the boring bits, let’s get started</span>
                </div>
                <div className='center'>
                  <Link to={'/register'} data-animate='tada' className='button button-3d button-teal button-xlarge nobottommargin' style={{ backgroundColor: '#EB534D' }}><i className='icon-star3' />Get Started</Link>
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

export default enhance(Home)
