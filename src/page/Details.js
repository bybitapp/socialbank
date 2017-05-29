import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const enhance = compose(
  connect((state, props) => ({ project: state.projects.find((v) => v.id == props.match.params.id ) }) ),
)

class Details extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleH3 = {margin: 0}
    const styleH3Right = {margin: 0, textAlign: 'right'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}

    const tmp = {padding: '15px'}

    const { project } = this.props

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <MenuSideBar />
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div style={tmp}>
                            Information about account details
                        </div>
                    </div>
                </div>
            </div>
          </main>
          <Footer />
        </div>
    )
  }

}

export default enhance(Details)
