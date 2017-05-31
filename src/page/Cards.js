import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const enhance = compose(
  connect((state, props) => ({ project: state.projects.find((v) => v.id === props.match.params.id ) }) ),
)

class Details extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleH3 = {margin: 0}
    const styleH3Right = {margin: 0, textAlign: 'right'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}


    const { project } = this.props

    const tmp = {padding: '15px', overflow: 'auto'}
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
                          <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
                            <thead>
                              <tr>
                                <th className="mdl-data-table__cell--non-numeric">State</th>
                                <th className="mdl-data-table__cell--non-numeric">Card Type</th>
                                <th className="mdl-data-table__cell--non-numeric">Name on Card</th>
                                <th>Card Number</th>
                                <th className="mdl-data-table__cell--non-numeric">Card Brand</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Expirity Period</th>
                                <th className="mdl-data-table__cell--non-numeric">Renewal Type</th>
                                <th>Max. Loads</th>
                                <th>Max. Spends</th>
                                <th>Current Loads</th>
                                <th>Current Spends</th>
                                <th className="mdl-data-table__cell--non-numeric">Blocks</th>
                                <th className="mdl-data-table__cell--non-numeric">Destroy Type</th>
                                <th className="mdl-data-table__cell--non-numeric">Actions</th>
                                <th>Created In</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="mdl-data-table__cell--non-numeric">Active</td>
                                <td className="mdl-data-table__cell--non-numeric">Virtual</td>
                                <td className="mdl-data-table__cell--non-numeric">Yugo Sakamoto</td>
                                <td>4545.3453.5554.4433</td>
                                <td className="mdl-data-table__cell--non-numeric">Master Card</td>
                                <td>2017-04-20 16:44:00</td>
                                <td>2021-04-20 16:44:00</td>
                                <td className="mdl-data-table__cell--non-numeric">3 years</td>
                                <td className="mdl-data-table__cell--non-numeric">Auto</td>
                                <td>30</td>
                                <td>30</td>
                                <td>10</td>
                                <td>5</td>
                                <td className="mdl-data-table__cell--non-numeric">Operator</td>
                                <td className="mdl-data-table__cell--non-numeric">Owner</td>
                                <td className="mdl-data-table__cell--non-numeric">
                                  <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                    <i className="material-icons">edit</i>
                                  </button>
                                  <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                    <i className="material-icons">block</i>
                                  </button>
                                </td>
                                <td>2017-04-20 16:44:00</td>
                              </tr>
                              <tr>
                                <td className="mdl-data-table__cell--non-numeric">Pre-active</td>
                                <td className="mdl-data-table__cell--non-numeric">Plastic</td>
                                <td className="mdl-data-table__cell--non-numeric">Alex Mifsud</td>
                                <td>3333.3453.5554.1111</td>
                                <td className="mdl-data-table__cell--non-numeric">Master Card</td>
                                <td>2017-04-20 16:44:00</td>
                                <td>2021-04-20 16:44:00</td>
                                <td className="mdl-data-table__cell--non-numeric">3 years</td>
                                <td className="mdl-data-table__cell--non-numeric">Auto</td>
                                <td>30</td>
                                <td>30</td>
                                <td>10</td>
                                <td>5</td>
                                <td className="mdl-data-table__cell--non-numeric">Operator</td>
                                <td className="mdl-data-table__cell--non-numeric">Owner</td>
                                <td className="mdl-data-table__cell--non-numeric">
                                  <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                    <i className="material-icons">edit</i>
                                  </button>
                                  <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                                    <i className="material-icons">block</i>
                                  </button>
                                </td>
                                <td>2017-04-20 16:44:00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div style={styleButtonBar}>
                          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                            Add Card
                          </button>
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
