import React from 'react'
import Map from './Map'
import Header from './Header'
import Footer from './Footer'
import ProjectSideBar from './ProjectSideBar'

const styleMain = {minHeight: '595px'}

export default ({ projects = {} }) => (
    <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
      <Header />
      <main className='mdl-layout__content'>
        <div className='page-content'>
            <div className='mdl-grid' style={styleMain}>
                <div className='mdl-cell mdl-cell--3-col'>
                    <ProjectSideBar projects={projects} />
                </div>
                <div className='mdl-cell mdl-cell--9-col'>
                    <Map projects={projects} />
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>)
