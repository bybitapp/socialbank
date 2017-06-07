import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { getCards } from '../actions'
import CardForm from '../components/CardForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import Select from '../components/Select'

const stateLabel = {
  "NO_MANAGED_CARD_STATE": {label: 'No state', style: {textAlign:"center", width:"80px", backgroundColor: "gray"}},
  "PRE_ACTIVE": {label: 'Pre-active', style: {textAlign:"center", width:"80px", backgroundColor: "#B6FCB6"}},
  "ACTIVE": {label: 'Active', style: {textAlign:"center", width:"80px", backgroundColor: "#98FB98"}},
  "PRE_DESTROYED": {label: 'Pre-destroyed', style: {textAlign:"center", width:"80px", backgroundColor: "#FBA69C"}},
  "DESTROYED": {label: 'Destroyed', style: {textAlign:"center", width:"80px", backgroundColor: "#FA8072"}},
}

const selector = formValueSelector('cards')

function mapStateToProps(state) {
  const { cards, projects, modal } = state
  const selectedProject = selector(state, 'project')
  return {
    cards,
    projects,
    selectedProject,
    modal
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal'),
  reduxForm({
    form: 'cards'
  })
)

const ActionLink = ({icon}) => (
  <Link className="mdl-list__item-primary-content" to={ '/cards/action' }>
    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">{ icon }</i>
  </Link>
)

const CardItem = ({card}) => (
    <tr>
      <td>
        <span className="mdl-chip" style={stateLabel[card.state].style}>
          <span className="mdl-chip__text">{stateLabel[card.state].label}</span>
        </span>
      </td>
      <td>{ card.nameOnCard }</td>
      <td>{ card.cardNumber }</td>
      <td>{ card.cardBrand }</td>
      <td>{ `${card.expiryPeriod.periodLength} ${card.expiryPeriod.timeUnit.toLowerCase()}s` }</td>
      <td>{ `${card.currentNumberOfLoads} / ${card.maxNumberOfLoads}` }</td>
      <td>{ `${card.currentNumberOfSpends} / ${card.maxNumberOfSpends}` }</td>
      <td className="sb-menu-table">
        <ActionLink icon="edit" />
        <ActionLink icon="block" />
        <ActionLink icon="delete" />
        <ActionLink icon="details" />
      </td>
    </tr>)

const CardTable = ({cards = [], styleTable}) => (
    <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
      <thead>
        <tr>
          <th>State</th>
          <th>Name on Card</th>
          <th>Card Number</th>
          <th>Card Brand</th>
          <th>Expirity</th>
          <th>Loads / Total</th>
          <th>Spends / Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      { Object.keys(cards).map((key, index) => {
        const c = cards[key]
        return (<CardItem key={key} card={c}/>)
      })}
      </tbody>
    </table>)

class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeProject = this.onChangeProject.bind(this)
  }

  onChangeProject(e) {
    const { value } = e.target
    const { dispatch } = this.props
    dispatch(getCards(value))
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0, overflow:"auto"}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { cards, projects, modal, setModal, selectedProject } = this.props

    const projectList = projects.map((item, index) => {
      return {
        id: item.id,
        name: item.name
      }
    })

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <CardForm open={(modal === 'cardModal')} handleClose={() => setModal(null)} projectId={selectedProject}/>
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
                              <Field name="project" label="Project Name" component={Select} items={projectList}
                                onChange={this.onChangeProject} />
                            </div>
                            <div className="mdl-cell mdl-cell--5-col" style={styleButton}>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                  disabled={!selectedProject} onClick={() => setModal('cardModal')}>
                                    Add Card
                                </button>
                            </div>
                          </div>
                          <CardTable cards={cards} styleTable={styleTable} />
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
