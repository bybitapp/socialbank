import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import MobileNavigation from '../components/MobileNavigation'
import ContactForm from '../components/ContactForm'
import SubjectBox from '../components/SubjectBox'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Map from '../components/Map'
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
    const styleHeight = { height: 'inherit' }
    const styleButtonBottom = { marginBottom: '40px' }
    const styleClients = { height: '150px' }

    const { organizations } = this.props

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <MobileNavigation />
        <div className="android-content mdl-layout__content">
          <div className="android-be-together-section mdl-typography--text-center" style={styleHeight}>
            <div className="logo-font android-slogan">Only together we can change poverty!</div>
            <div className="logo-font android-sub-slogan">welcome to socialbank... be yourself. do your thing. see whats going on.</div>
            <div className="logo-font android-create-character">
              <Link style={styleButtonBottom} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to={'/registration'}>
                  Create your bank account
              </Link>
            </div>
          </div>
          <div className="android-more-section">
            <div className="android-section-title mdl-typography--display-1-color-contrast">More from SocialBank</div>
            <div className="android-card-container mdl-grid">
              <SubjectBox
                title="Building Trust"
                description="SocialBank gives donors complete transparency and information regarding finance distribution in charitable and community projects."
                image="building_trust8.jpeg" />
              <SubjectBox
                title="Activating communities"
                description="Helping local leaders to engage volunteers and fund projects."
                image="activating_community5.jpeg" />
              <SubjectBox
                title="Financial Control"
                description="Simple system supporting processing financial activities in organisations of any size."
                image="financial_control.jpeg" />
              <SubjectBox
                title="Fundraising Support"
                description="Platform for social and charitable organisations to support their fundraising activities."
                image="fundraising.jpeg" />
            </div>
          </div>
          <div className="sb-map-section">
            <Map organizations={organizations} />
          </div>
          <div className="android-customized-section">
            <div className="android-customized-section-text">
              <div className="mdl-typography--font-light mdl-typography--display-1-color-contrast">Help Charity and Social Organizations</div>
              <p className="mdl-typography--font-light">
                Put the stuff that you care about right on your home screen: the latest news, the weather or a stream of your recent photos.
                <br/><br/><br/><br/>
              </p>
            </div>
            <div className="android-customized-section-image"></div>
          </div>
          <div className="android-customized-section">
            <div className="android-customized-section-text">
              <div className="mdl-typography--font-light mdl-typography--display-1-color-contrast">Our Partners</div>
              <p className="mdl-typography--font-light">
                <a href="http://www.pinuk.online/en/pin-uk-c-i-c/">
                  <img src="images/pin-ik-logo.jpeg" alt="{title}" style={styleClients}></img>
                </a>
                <br/><br/><br/><br/>
              </p>
            </div>
          </div>
          <ContactForm />
          <Footer />
        </div>
      </div>
    )
  }
}

export default enhance(Home)
