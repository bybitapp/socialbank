import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const enhance = compose(
  connect((state, props) => ({ project: state.projects.find((v) => v.id === props.match.params.id ) }) ),
)

class Details extends React.Component {

  openAddCardForm() {
      
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

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
                      <div className="mdl-grid">
                          <div className="mdl-cell mdl-cell--12-col" style={styleButton}>
                              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.openAddCardForm}>
                                  Add Card
                              </button>
                          </div>
                      </div>
                        <div style={stylePadding}>
                          <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
                            <thead>
                              <tr>
                                <th className="mdl-data-table__cell--non-numeric">State</th>
                                <th className="mdl-data-table__cell--non-numeric">Name on Card</th>
                                <th>Card Number</th>
                                <th className="mdl-data-table__cell--non-numeric">Card Brand</th>
                                <th className="mdl-data-table__cell--non-numeric">Expirity</th>
                                <th>Loads / Total</th>
                                <th>Spends / Total</th>
                                <th className="mdl-data-table__cell--non-numeric">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="mdl-data-table__cell--non-numeric">Active</td>
                                <td className="mdl-data-table__cell--non-numeric">Yugo Sakamoto</td>
                                <td>4545.3453.5554.4433</td>
                                <td className="mdl-data-table__cell--non-numeric">Visa</td>
                                <td className="mdl-data-table__cell--non-numeric">6 months</td>
                                <td>10 / 30</td>
                                <td>5 / 30</td>
                                <td className="sb-menu-table">
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">edit</i>
                                  </Link>
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/block/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">block</i>
                                  </Link>
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/delete/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">delete</i>
                                  </Link>
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">detail</i>
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <td className="mdl-data-table__cell--non-numeric">Pre-active</td>
                                <td className="mdl-data-table__cell--non-numeric">Alex Mifsud</td>
                                <td>3333.3453.5554.1111</td>
                                <td className="mdl-data-table__cell--non-numeric">Master Card</td>
                                <td className="mdl-data-table__cell--non-numeric">3 years</td>
                                <td>20 / 40</td>
                                <td>10 / 30</td>
                                <td className="sb-menu-table">
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">edit</i>
                                  </Link>
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/block/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">block</i>
                                  </Link>
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/delete/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">delete</i>
                                  </Link>
                                  <Link className="mdl-list__item-primary-content" to={ '/cards/1' }>
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">detail</i>
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
