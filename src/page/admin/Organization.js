import React from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import OrganizationForm from '../../components/OrganizationForm'

class Organization extends React.Component {
  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const stylePadding = {padding: '15px'}

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col' style={styleBorderLeft}>
                  <div style={stylePadding}>
                    <OrganizationForm />
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

export default Organization
