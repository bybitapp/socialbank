import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Map from '../components/Map'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactInfo from '../components/ContactInfo'
import SubjectBox from '../components/SubjectBox'
import { Link } from 'react-router-dom'
import { getOrganizations } from '../actions'

function mapStateToProps(state) {
  const { organizations } = state
  return {
    organizations
  }
}

const enhance = compose(
  connect(mapStateToProps),
)

class Home extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getOrganizations())
  }

  componentDidUpdate(prevProps) {
    if (this.props.organizations !== prevProps.organizations) {
      const { dispatch } = this.props
      dispatch(getOrganizations())
    }
  }

  render () {

    const styleHeight = {height: 'inherit'}
    const styleText = {textAlign: 'justify', padding: '0 50px'}

    const { organizations } = this.props

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <div className="android-content mdl-layout__content">
            <div className="android-be-together-section mdl-typography--text-center" style={styleHeight}>
              <div className="logo-font android-slogan">be together. not the same.</div>
              <div className="logo-font android-sub-slogan">welcome to socialbank... be yourself. do your thing. see whats going on.</div>
              <div className="logo-font android-create-character">
                <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to={'/registration'}>
                    Create your bank account
                </Link>
              </div>
            </div>
            <div className="android-screen-section mdl-typography--text-center">
              <div className="mdl-grid" style={styleText}>
                <SubjectBox
                  title="Building Trust"
                  description="SocialBank gives donors complete transparency and information regarding finance distribution in charitable and community projects."
                  headerStyle={{"background-color":"#0392cf"}}
                  icon="thumb_up"/>
                <SubjectBox
                  title="Activating communities"
                  description="Helping local leaders to engage volunteers and fund projects."
                  headerStyle={{"background-color":"#7bc043"}}
                  icon="public"/>
                <SubjectBox
                  title="Financial Control"
                  description="Simple system supporting processing financial activities in organisations of any size. "
                  headerStyle={{"background-color":"#4f372d"}}
                  icon="attach_money"/>
                <SubjectBox
                  title="Fundraising Support"
                  description="Platform for social and charitable organisations to support their fundraising activities."
                  headerStyle={{"background-color":"#ee4035"}}
                  icon="mood"/>
              </div>
            </div>
            <div className="android-wear-section">
                <Map organizations={organizations} />
            </div>
            <ContactInfo styleText={styleText}/>
            <Footer />
          </div>
      </div>)
  }
}

export default enhance(Home)
