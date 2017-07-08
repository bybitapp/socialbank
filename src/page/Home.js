import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import MobileNavigation from '../components/MobileNavigation'
import ContactForm from '../components/ContactForm'
import SubjectBox from '../components/SubjectBox'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Map from '../components/Map'
import CookieBanner from '../components/CookieBanner'
import { Link } from 'react-router-dom'
import { getOrganizations } from '../actions'

function mapStateToProps (state) {
  const { organizations } = state
  return {
    organizations
  }
}

const enhance = compose(
  connect(mapStateToProps)
)

class Home extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getOrganizations())
  }

  render () {
    const styleSubtitle = { margin: 0 }
    const iconStyle = {display: 'block', margin: '0 auto'}
    const styleHeight = { height: '450px', backgroundImage: 'url(images/plexus3-1280x720.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
    const styleButtonBottom = { marginTop: '70px', marginBottom: '40px' }
    const styleSubSlogan = {textShadow: '5px 5px 9px black', paddingTop: 0}
    const styleClients = { maxHeight: '150px', maxWidth: '210px' }

    const { organizations } = this.props

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <CookieBanner />
        <Header />
        <MobileNavigation />
        <div className='android-content mdl-layout__content'>
          <div className='mdl-typography--text-center' style={styleHeight}>
            <div className='logo-font android-slogan'>
              <h1>Join the Global Financial Network!</h1>
            </div>
            <div className='logo-font android-sub-slogan mdl-color-text--white' style={styleSubSlogan}>
              <h2>Simple financial management system with instant, certain, low-cost payments.</h2>
            </div>
            <div className='logo-font'>
              <Link style={styleButtonBottom} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' to={'/registration'}>
                  Create your social account
              </Link>
            </div>
          </div>
          <div className='android-more-section'>
            <div className='android-section-title mdl-typography--display-1-color-contrast'>More from SoTec</div>
            <div className='android-card-container mdl-grid'>
              <SubjectBox
                title='Building Trust'
                description='SoTec gives donors complete transparency and information regarding finance distribution in charitable and community projects.'
                image='building_trust.png' />
              <SubjectBox
                title='Activating communities'
                description='Helping local leaders to engage volunteers and fund projects.'
                image='activating_community.jpeg' />
              <SubjectBox
                title='Financial Control'
                description='Simple system supporting processing financial activities in organisations of any size.'
                image='financial_control.jpeg' />
              <SubjectBox
                title='Fundraising Support'
                description='Platform for social and charitable organisations to support their fundraising activities.'
                image='fundraising.jpeg' />
            </div>
          </div>
          <div className='sb-map-section'>
            <Map organizations={organizations} />
          </div>
          <div className='android-customized-section'>
            <div className='android-customized-section-text'>
              <div className='mdl-typography--font-light mdl-typography--display-1-color-contrast'>Build your Social Value and Trust</div>
              <p className='mdl-typography--font-light'>
                We enable organizations to send real-time payments across networks and operate within micropayments. SoTec works on the Open Bank technologies to improve transfer money around the social organizations. Our vision is to build the Global Financial Network around the world and move value the way it moves information today.
                <br /><br /><br /><br />
              </p>
            </div>
            <div className='android-customized-section-image' />
          </div>
          <div className='android-customized-section'>
            <div className='android-customized-section-text'>
              <div className='mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                <img src='images/awards_icon100x100.png' alt='{title}' style={iconStyle} />
                <div className='android-section-title mdl-typography--display-1-color-contrast'>Awards</div>
                <div>
                  <br />
                  <p className='mdl-typography--font-light' style={styleSubtitle}> Winner at</p>
                  <div className='mdl-typography--font-light mdl-typography--display-1-color-contrast'>Open Payment Hackathon 2017</div>
                  <br />
                  <br />
                  <blockquote dataLang='en'>
                    <p lang='en' dir='ltr' className='mdl-typography--font-light'>
                      Love the idea behind SoTec and ready to roll up sleeves to get this little beauty to market <a href='https://t.co/xiwAsjBdRq'>Team @SoTec_UK Wins OPCLive!</a>
                    </p>
                    <cite>
                      Alex Mifsud, CEO of Ixaris (@alexmifsud) <a href='https://twitter.com/alexmifsud/status/879970746616995840'>June 28, 2017</a>
                    </cite>
                  </blockquote>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className='android-customized-section'>
            <div className='android-card-container mdl-grid'>
              <div className='mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet' />
              <div className='mdl-cell mdl-cell--5-col mdl-cell--5-col-tablet mdl-cell--12-col-phone'>
                <div className='android-customized-section-text'>
                  <div className='mdl-typography--font-light mdl-typography--display-1-color-contrast'>Our Partners</div>
                  <p className='mdl-typography--font-light'>
                    <a href='http://www.pinuk.online/en/pin-uk-c-i-c/'>
                      <img src='images/pin-ik-logo.jpeg' alt='{title}' style={styleClients} />
                    </a>
                  </p>
                </div>
              </div>
              <div className='mdl-cell mdl-cell--5-col mdl-cell--5-col-tablet mdl-cell--12-col-phone'>
                <div className='android-customized-section-text'>
                  <div className='mdl-typography--font-light mdl-typography--display-1-color-contrast'>Sponsors</div>
                  <p className='mdl-typography--font-light'>
                    <a href='https://www.ixaris.com/'>
                      <img src='images/ixaris_logo.png' alt='{title}' style={styleClients} />
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <br /><br /><br /><br />
          </div>
          <ContactForm />
          <Footer />
        </div>
      </div>
    )
  }
}

export default enhance(Home)
