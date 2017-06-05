import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { getCards } from '../actions'
import AddCardForm from '../components/AddCardForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const stateLabel = {
  "NO_MANAGED_CARD_STATE": {label: 'No state', style: {"text-align":"center", "width":"80px", "background-color": "gray"}},
  "PRE_ACTIVE": {label: 'Pre-active', style: {"text-align":"center", "width":"80px", "background-color": "#B6FCB6"}},
  "ACTIVE": {label: 'Active', style: {"text-align":"center", "width":"80px", "background-color": "#98FB98"}},
  "PRE_DESTROYED": {label: 'Pre-destroyed', style: {"text-align":"center", "width":"80px", "background-color": "#FBA69C"}},
  "DESTROYED": {label: 'Destroyed', style: {"text-align":"center", "width":"80px", "background-color": "#FA8072"}},
}

function mapStateToProps(state) {
  const { cards, projects, modal } = state
  return {
    cards,
    projects,
    modal
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
      form: 'card'
  }),
  withState('modal', 'setModal')
)

const ProjectSelectorItem = ({project, onSelectProject}) => (
    <li className="mdl-menu__item" data-val={project.id} onClick={(e)=>onSelectProject(project)}>{project.name}</li>
)

const ProjectSelector = ({projects = [], onSelectProject, selectedProject}) => (
  <div className="mdl-cell mdl-cell--7-col">
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
        <input className="mdl-textfield__input" id="selectedProject" name="selectedProject" type="text" readOnly tabIndex="-1"
          value={selectedProject ? selectedProject.name : ""}
          data-val={selectedProject ? selectedProject.id : ""}/>
        <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="selectedProject">
            { Object.keys(projects).map((key, index) => {
              const p = projects[key]
              return (<ProjectSelectorItem project={p} onSelectProject={onSelectProject}/>)
            })}
        </ul>
    </div>
  </div>
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
     this.state = {
       selectedProject: null
     }
     this.onSelectProject = this.onSelectProject.bind(this)
   }

  componentDidMount() {
    // TODO we should select first project from list as default
    // const { dispatch } = this.props
    // dispatch(getCards(-1))
  }

  componentDidUpdate(prevProps) {
    if(this.state && this.state.selectedProject) {
      const { dispatch } = this.props
      dispatch(getCards(this.state.selectedProject.id))
    }
  }

  onSelectProject(project) {
    this.setState({
      selectedProject: project
    })
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0, overflow:"auto"}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { cards, projects, modal, setModal } = this.props

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
                              <ProjectSelector projects={projects} onSelectProject={this.onSelectProject} selectedProject={this.state.selectedProject}/>
                              <div className="mdl-cell mdl-cell--5-col" style={styleButton}>
                                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" disabled={!this.state.selectedProject} onClick={() => setModal('cardModal')}>
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
