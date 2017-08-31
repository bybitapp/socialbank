import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

// import NewsletterSubscribe from '../components/NewsletterSubscribe'
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
              <h1 data-style-lg='font-size: 52px;' data-style-md='font-size: 44px;'><b>Payment card solution</b> that manages and simplifies your <strong style={{ color: '#00D0A7' }}>company</strong> spending.</h1>
            </div>
            <div>
              <Link to={'/demo'} className='button button-desc button-border button-rounded nomargin'>
                <div>Find out how</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const WhyDoYouNeedApp = () => (
  <div>
    <div className='container clearfix'>
      <div className='row topmargin-lg bottommargin-sm'>
        <div className='heading-block center nobottomborder'>
          <h2>Why do you need sotec?</h2>
          <span className='divcenter'>The system is dedicated to simplify the entire business spending cycle – with Visa<sup>&#174;</sup> prepaid cards, intuitive admin, and effortless reporting.</span>
        </div>
      </div>
    </div>
    <FeatureBoxLeft
      title='Real-time spending overview'
      desc='Discover our intuitive interface, offers real-time tracking and alerts, and allows budgets to be set, limits to be changed, and cards to be turned on or off with one simple click.'
      icon='images/homepage/real-time.png' />
    <FeatureBoxRight
      title='Payment cards for employees'
      desc='Issue virtual cards without needing to collect personal information just in few clicks. Spending on cards may be restricted using: time, budget or business activities.'
      icon='images/homepage/cards.png' />
    <FeatureBoxLeft
      title='Automated expense reports'
      desc='Take your control of business expenses. Share virtual cards that organize expenses and automate report process by adding image of receipt in real time.'
      icon='images/homepage/reports.png' />
  </div>
)

const WhyVirtualCards = () => (
  <div className='container clearfix'>
    <div className='row topmargin-sm bottommargin-sm'>
      <div className='heading-block center'>
        <h2>Why do you need Virtual Cards?</h2>
        <span className='divcenter'>Virtual visa card is a representation of plastic card which allows exactly on these same operations only with the small exception that mobile phone has to be involved in the terminal payment.</span>
      </div>
      <div className='col_one_third'>
        <div className='feature-box fbox-center fbox-effect nobottomborder' data-animate='fadeIn'>
          <div className='fbox-icon'>
            <i className='icon-home' />
          </div>
          <h3>Controlled</h3>
          <p>Freeze cards and set spending limits. Maintain control of your money.</p>
        </div>
      </div>
      <div className='col_one_third'>
        <div className='feature-box fbox-center fbox-effect nobottomborder' data-animate='fadeIn' data-delay='200'>
          <div className='fbox-icon'>
            <i className='icon-diamond' />
          </div>
          <h3>Secure</h3>
          <p>Lock card whenever you want, making them useless to buy.</p>
        </div>
      </div>
      <div className='col_one_third col_last'>
        <div className='feature-box fbox-center fbox-effect nobottomborder' data-animate='fadeIn' data-delay='400'>
          <div className='fbox-icon'>
            <i className='icon-credit-cards' />
          </div>
          <h3>Cards Management</h3>
          <p>Easily keep track of multiple cards.</p>
        </div>
      </div>
      <div className='clear' />
      <div className='col_one_third'>
        <div className='feature-box fbox-center fbox-effect nobottomborder' data-animate='fadeIn'>
          <div className='fbox-icon'>
            <i className='icon-wallet' />
          </div>
          <h3>Private</h3>
          <p>Keep sensitive information safe and private.</p>
        </div>
      </div>
      <div className='col_one_third'>
        <div className='feature-box fbox-center fbox-effect nobottomborder' data-animate='fadeIn' data-delay='200'>
          <div className='fbox-icon'>
            <i className='icon-lock' />
          </div>
          <h3>Disposable</h3>
          <p>Delete unneeded cards anytime and forget about unused subscriptions.</p>
        </div>
      </div>
      <div className='col_one_third col_last'>
        <div className='feature-box fbox-center fbox-effect nobottomborder' data-animate='fadeIn' data-delay='400'>
          <div className='fbox-icon'>
            <i className='icon-download2' />
          </div>
          <h3>Easy reporting</h3>
          <p>Download your transaction history to easily track your spending.</p>
        </div>
      </div>
    </div>
  </div>
)

// const Explainer = () => (
//   <div className='row clearfix common-height'>
//     <div className='col-md-12 center col-padding' style={{ backgroundColor: '#F5F5F5' }}>
//       <div>
//         <div className='heading-block nobottomborder'>
//           <h3>WANT TO KNOW A LITTLE MORE?</h3>
//           <span className='before-heading color'>This 3-minute film provides a clear overview of our system.</span>
//         </div>
//         <div className='center bottommargin'>
//           <a href='https://www.youtube.com/watch?v=kX2PiKgkr-Y' data-lightbox='iframe' style={{ position: 'relative' }}>
//             <img src='images/homepage/video-background.jpg' alt='Video' />
//             <span className='i-overlay nobg'><img src='images/homepage/video-play.png' alt='Play' /></span>
//           </a>
//         </div>
//         <p className='lead nobottommargin'>Powering business payment forward.</p>
//       </div>
//     </div>
//   </div>
// )

const WhatOthersSay = () => (
  <div className='section parallax dark notopmargin nobottommargin' style={{ backgroundImage: 'url("images/homepage/real-time-bg.jpg")', padding: '100px 0' }} data-stellar-background-ratio='0.4'>
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
        <h2>SoTec Adapts To Any Business</h2>
        <span>It&#39;s Easy To Sign Up And Takes About 5 Minutes.</span>
      </div>
      <div className='clear bottommargin-sm' />
      <div className='col_one_fourth nobottommargin'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <i className='i-alt noborder icon-wallet' />
          </div>
          <h3>Create an account<span className='subtitle'>Create an account and set up your organisation</span></h3>
        </div>
      </div>
      <div className='col_one_fourth nobottommargin'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <i className='i-alt noborder icon-money' />
          </div>
          <h3>Add money to projects<span className='subtitle'>Transfer money from your bank account to your projects</span></h3>
        </div>
      </div>
      <div className='col_one_fourth nobottommargin'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <i className='i-alt noborder icon-user' />
          </div>
          <h3>Distribute cards<span className='subtitle'>Transfer money to people involved in your projects</span></h3>
        </div>
      </div>
      <div className='col_one_fourth nobottommargin col_last'>
        <div className='feature-box fbox-center fbox-light fbox-effect nobottomborder'>
          <div className='fbox-icon'>
            <i className='i-alt noborder icon-shop' />
          </div>
          <h3>Start spending<span className='subtitle'>Use your SoTec card to pay anyone, anywhere (even contactless!)</span></h3>
        </div>
      </div>
    </div>
  </div>
)

// const MediaAboutUs = () => (
//   <div className='section' style={{padding: 0, margin: 0, height: '180px'}}>
//     <div id='oc-clients-full' className='owl-carousel owl-carousel-full image-carousel footer-stick' style={{padding: '30px 0'}}>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//       <div className='oc-item'><a href='http://logofury.com/'><img src='images/media/1.png' alt='Clients' /></a></div>
//     </div>
//   </div>
// )

const WhyDebitCard = () => (
  <div />
)

const UseCase = () => (
  <div />
)

const FeatureBoxLeft = ({title, desc, icon}) => (
  <div className='section notopmargin nobottommargin' style={{backgroundColor: '#FFFFFF'}}>
    <div className='container clearfix' style={{ zIndex: 1 }}>
      <div className='col-md-8 nobottommargin'>
        <div className='heading-block topmargin-sm nobottomborder'>
          <h2>{title}</h2>
          <span>{desc}</span>
        </div>
      </div>
      <div className='col-md-4 hidden-sm topmargin-sm center'>
        <img src={icon} alt='account spends' style={{width: '50%'}} />
      </div>
    </div>
  </div>
)

const FeatureBoxRight = ({title, desc, icon}) => (
  <div className='section notopmargin nobottommargin'>
    <div className='container clearfix' style={{ zIndex: 1 }}>
      <div className='col-md-4 hidden-sm topmargin-sm center'>
        <img src={icon} alt='account spends' style={{width: '50%'}} />
      </div>
      <div className='col-md-8 nobottommargin'>
        <div className='heading-block topmargin-sm nobottomborder'>
          <h2>{title}</h2>
          <span>{desc}</span>
        </div>
      </div>
    </div>
  </div>
)

const BookADemo = () => (
  <div id='section-buy' className='section page-section' style={{backgroundColor: '#FFFFFF', margin: 0}}>
    <div className='container clearfix'>
      <div className='heading-block title-center nobottomborder'>
        <h2>Stay on top of your company&#39;s spending</h2>
        <span>Now that you’ve read all the boring bits, let’s get started</span>
      </div>
      <div className='center'>
        <Link to={'/demo'} data-animate='tada' className='button button-3d button-teal button-xlarge nobottommargin' style={{ backgroundColor: '#EB534D' }}><i className='icon-star3' />Get Started</Link>
      </div>
    </div>
  </div>
)

class Home extends React.Component {
  componentDidMount () {
    // var ocClients = global.$('#oc-clients-full')
    // console.log(ocClients);
    // ocClients.owlCarousel({
    //   rtl: true,
    //   margin: 30,
    //   loop: true,
    //   nav: false,
    //   autoplay: true,
    //   dots: false,
    //   autoplayHoverPause: true,
    //   responsive: {
    //     0: { items: 3 },
    //     600: { items: 4 },
    //     1000: { items: 5 },
    //     1200: { items: 6 },
    //     1400: { items: 7 }
    //   }
    // })
  }

  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <TopView />
        <section id='content'>
          <div className='content-wrap' style={{backgroundColor: '#F9F9F9', padding: 0}}>
            <WhyDoYouNeedApp />
            <HowStart />

            <WhyVirtualCards />
            <WhyDebitCard />

            <UseCase />
            <WhatOthersSay />
            <BookADemo />
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default enhance(Home)
