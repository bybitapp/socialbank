import React from 'react'
import Map from '../components/Map'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const styleHeight = {height: 'inherit'}
const styleText = {textAlign: 'justify', padding: '0 50px'}

export default ({ projects = {} }) => (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <div className="android-content mdl-layout__content">

            <div className="android-be-together-section mdl-typography--text-center" style={styleHeight}>
              <div className="logo-font android-slogan">be together. not the same.</div>
              <div className="logo-font android-sub-slogan">welcome to socialbak... be yourself. do your thing. see whats going on.</div>
              <div className="logo-font android-create-character">
                <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to={'/registration'}>
                    Create your bank account
                </Link>
              </div>
            </div>

            <div className="android-screen-section mdl-typography--text-center">
                <div className="mdl-grid" style={styleText}>
                    <div className="mdl-cell mdl-cell--3-col">
                    <h5>Building Trust</h5>
                   SocialBank gives donors complete transparency and information regarding finance distribution in charitable and community projects.
<br/><br/>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                    <h5>Activating communities</h5>
                    Helping local leaders to engage volunteers and fund projects.<br/><br/>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                    <h5>Financial Control</h5>
                    Simple system supporting processing financial activities in organisations of any size. <br/><br/>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col">
                    <h5>Fundraising Support</h5>
                    Platform for social and charitable organisations to support their fundraising activities.<br/><br/>
                    </div>
                </div>
            </div>
            <div className="android-wear-section">
                <Map projects={projects} />
            </div>
            <Footer/>
        </div>
    </div>)
