import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import UpdateAddress from '../components/UpdateAddress'
import UpdateBank from '../components/UpdateBank'
import UpdatePassword from '../components/UpdatePassword'
import GeneralInformation from '../components/GeneralInformation'

const enhance = compose(
  connect((state, props) => ({ project: state.projects.find((v) => v.id === props.match.params.id ) }) ),
  reduxForm({
        form: 'generalInformation'
  })
)

class Details extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const stylePaddng = {padding: '15px'}

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
                        <div style={stylePaddng}>
                            <GeneralInformation />
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

export default enhance(Details)
