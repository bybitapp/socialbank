import React from 'react'

import Header from '../components/Header'
import MobileNavigation from '../components/MobileNavigation'
import Footer from '../components/Footer'

class About extends React.Component {
  render () {
    const styleText = {textAlign: 'justify'}

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <MobileNavigation />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="sb-form-content sb-page" style={styleText}>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--12-col">
                          <h5>About SocialBank</h5>
                          <br/><br/>
                          SocialBank gives donors complete transparency and information regarding finance distribution in charitable and community projects.<br/><br/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
          </main>
        </div>
    )
  }
}

export default About
