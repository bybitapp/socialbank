import React from 'react'
import Map from './Map'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const styleMain = {minHeight: '595px'}

export default ({ projects = {} }) => (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <div className="android-content mdl-layout__content">

            <div className="android-be-together-section mdl-typography--text-center">
              <div className="logo-font android-slogan">be together. not the same.</div>
              <div className="logo-font android-sub-slogan">welcome to socialbak... be yourself. do your thing. see whats going on.</div>
              <div className="logo-font android-create-character">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Create your bank account
                </button>
              </div>
            </div>

            <div className="android-screen-section mdl-typography--text-center">Description</div>
            <div className="android-wear-section">
                <Map projects={projects} />
            </div>
            <div className="android-screen-section mdl-typography--text-center">Other</div>

            <Footer />
        </div>
    </div>)
