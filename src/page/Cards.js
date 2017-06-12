import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, change, Field, formValueSelector } from 'redux-form'
import { getCards } from '../actions'
import { CARD_STATUS } from '../constants/Option'
import CardForm from '../components/CardForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import Select from '../components/Select'

const selector = formValueSelector('cards')

function mapStateToProps(state) {
  const { cards, projects, modal } = state
  let selectedProject = selector(state, 'project')
  if (!selectedProject) {
    if (projects && projects.length) {
      selectedProject = projects[0].id
    }
  }
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

const ActionButton = (cid, action) => (
  <a key={action.icon} className="mdl-list__item-primary-content" onClick={(event)=>action.onclick(cid, event)}>
    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">{action.icon}</i>
  </a>
)

const CardItem = ({card, actions}) => (
    <tr>
      <td className="mdl-data-table__cell--non-numeric">{ card.name }</td>
      <td>{ card.cardNumber }</td>
      <td>{ card.cardBrand }</td>
      <td>{ card.startDate }</td>
      <td>{ card.endDate }</td>
      <td>{ card.state }</td>
      <td>{ card.balances.actual }</td>
      <td className="sb-menu-table">
        { actions.map((action)=>ActionButton(card.id, action)) }
      </td>
      </tr>)
}

const CardTable = ({cards = [], styleTable, actions}) => (
    <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
      <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">Name</th>
          <th>Card Number</th>
          <th>Brand</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      { Object.keys(cards).map((key, index) => {
        const c = cards[key]
        return (<CardItem key={key} card={c} actions={actions}/>)
      })}
      </tbody>
    </table>)

class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeProject = this.onChangeProject.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedProject } = this.props
    if (selectedProject) {
      dispatch(getCards(selectedProject))
    }
  }

  onChangeProject(e) {
    const { value } = e.target
    const { dispatch } = this.props
    dispatch(getCards(value))
  }

  onEdit (cid, event) {
    const { cards, setModal, dispatch } = this.props
    const card = cards.find((card)=>{return card.id === cid})
    if (card) {
      dispatch(change('cardForm', 'cid', card.id));
      dispatch(change('cardForm', 'name', card.name));
      dispatch(change('cardForm', 'status', card.status));
      setModal('cardModal')
    }
  }

  onDestroy (pid, event) {
    // const { projects, setModal, dispatch } = this.props
    // const project = projects.find((project)=>{return project.id === pid})
    // if (project) {
    //   dispatch(change('projectCloseForm', 'pid', project.id));
    //   setModal('projectCloseModal')
    // }
  }

  onTransfer (pid, event) {
    // const { projects, account, setModal, dispatch } = this.props
    // const project = projects.find((project)=>{return project.id === pid})
    // if (project) {
    //   if (account.organization) {
    //     const { bankAccount } = account.organization
    //     dispatch(change('projectDepositForm', 'pid', project.id));
    //     dispatch(change('projectDepositForm', 'oid', account.organization._id));
    //     dispatch(change('projectDepositForm', 'bank', bankAccount.bankName));
    //     dispatch(change('projectDepositForm', 'iban', bankAccount.ibanCode));
    //     dispatch(change('projectDepositForm', 'name', project.name));
    //     setModal('projectDepositModal')
    //   }
    // }
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

    const actions = [
      {icon: 'attach_money', onclick: this.onTransfer},
      {icon: 'mode_edit', onclick: this.onEdit},
      {icon: 'delete', onclick: this.onDestroy}
    ]

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
                          <CardTable cards={cards} styleTable={styleTable} actions={actions} />
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

const CardItem = ({card, actions}) => {
  const cardStatus = CARD_STATUS.find((status) => (status.id === card.status))
  const cardStatusName = cardStatus ? cardStatus.name : "Unknown"
  return (
      <tr>
      <td className="mdl-data-table__cell--non-numeric">{ card.name }</td>
      <td>{ card.cardNumber }</td>
      <td>{ card.cardBrand }</td>
      <td>{ card.startDate }</td>
      <td>{ card.endDate }</td>
      <td>{ cardStatusName }</td>
      <td>{ card.balances.actual }</td>
      <td className="sb-menu-table">
      { actions.map((action)=>ActionButton(card.id, action)) }