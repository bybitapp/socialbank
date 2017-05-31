import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AddCardForm from '../components/AddCardForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const enhance = compose(
  connect((state, props) => ({ project: state.projects.find((v) => v.id === props.match.params.id ) }) ),
  withState('modal', 'setModal')
)

class Cards extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { modal, setModal } = this.props

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <AddCardForm open={(modal === 'cardModal')} handleClose={() => setModal(null)} />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <MenuSideBar />
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div style={stylePadding}>
                          <div className="mdl-grid">
                              <div className="mdl-cell mdl-cell--7-col">
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
                                    <input className="mdl-textfield__input" id="selectedProject" name="selectedProject" value="Project Name 1" type="text" readOnly tabIndex="-1" data-val="BLR"/>
                                    <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="selectedProject">
                                        <li className="mdl-menu__item" data-val="1">Project Name 1</li>
                                        <li className="mdl-menu__item" data-val="2">Project Name 2</li>
                                        <li className="mdl-menu__item" data-val="2">Project Name 3</li>
                                    </ul>
                                </div>
                              </div>
                              <div className="mdl-cell mdl-cell--5-col" style={styleButton}>
                                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => setModal('cardModal')}>
                                      Add Card
                                  </button>
                              </div>
                          </div>
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
                                <th>Actions</th>
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
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">details</i>
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
                                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">details</i>
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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

export default enhance(Cards)
