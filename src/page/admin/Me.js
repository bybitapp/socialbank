import React from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import UpdatePassword from '../../components/UpdatePassword'
import GeneralData from '../../components/GeneralData'

class Me extends React.Component {
  render () {
    const stylePadding = {padding: '15px'}

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col mdl-cell--4-col-phone sb-menu-side-bar'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col'>
                  <div style={stylePadding}>
                    <GeneralData />
                    <UpdatePassword />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Me
