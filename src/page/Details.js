import React from 'react'

import Header from '../components/Header'
import MobileNavigation from '../components/MobileNavigation'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import UpdateAddress from '../components/UpdateAddress'
import UpdateBank from '../components/UpdateBank'
import UpdatePassword from '../components/UpdatePassword'
import GeneralData from '../components/GeneralData'

class Details extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const stylePadding = {padding: '15px'}

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <MobileNavigation />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <MenuSideBar />
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div style={stylePadding}>
                            <GeneralData />
                            <UpdateAddress />
                            <UpdateBank />
                            <UpdatePassword />
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

export default Details
