import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { getCards, getProjects, getProjectCards } from '../actions'
import AddCardForm from '../components/AddCardForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const stateLabel = {
  "NO_MANAGED_CARD_STATE": {label: 'No state', className: 'no-state'},
  "PRE_ACTIVE": {label: 'Pre-active', className: 'pre-active'},
  "ACTIVE": {label: 'Active', className: 'active'},
  "PRE_DESTROYED": {label: 'Pre-destroyed', className: 'pre-destroyed'},
  "DESTROYED": {label: 'Destroyed', className: 'destroyed'},
}

function mapStateToProps(state) {
  const { cards, projects, projectCards, modal } = state
  return {
    cards,
    projects,
    projectCards,
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
    <li className="mdl-menu__item" data-val={project.id} onClick={(e)=>(onSelectProject(project))}>{project.name}</li>
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

const CardItem = ({card}) => (
    <tr>
      <td className="mdl-data-table__cell--non-numeric">
        <i className={"material-icons mdl-list__item-avatar sb-icon-list_item"}>{ stateLabel[card.state].className }</i>
      </td>
      <td className="mdl-data-table__cell--non-numeric">{ card.nameOnCard }</td>
      <td className="mdl-data-table__cell--non-numeric">{ card.cardBrand }</td>
      <td className="mdl-data-table__cell--non-numeric">{ card.cardNumber }</td>
      <td className="mdl-data-table__cell--non-numeric">{ `${card.expiryPeriod.periodLength} ${String.toLowerCase(card.expiryPeriod.timeUnit)}s` }</td>
      <td className="mdl-data-table__cell--non-numeric">{ `${card.currentNumberOfLoads} / ${card.maxNumberOfLoads}` }</td>
      <td className="mdl-data-table__cell--non-numeric">{ `${card.currentNumberOfSpends} / ${card.maxNumberOfSpends}` }</td>
      <td className="sb-menu-table">
        <Link className="mdl-list__item-primary-content" to={ '/card/1' }>
          <i className="material-icons mdl-list__item-avatar sb-icon-list_item">edit</i>
        </Link>
        <Link className="mdl-list__item-primary-content" to={ '/card/block/1' }>
          <i className="material-icons mdl-list__item-avatar sb-icon-list_item">block</i>
        </Link>
        <Link className="mdl-list__item-primary-content" to={ '/card/delete/1' }>
          <i className="material-icons mdl-list__item-avatar sb-icon-list_item">delete</i>
        </Link>
        <Link className="mdl-list__item-primary-content" to={ '/card/1' }>
          <i className="material-icons mdl-list__item-avatar sb-icon-list_item">details</i>
        </Link>
      </td>
    </tr>)

const CardTable = ({cards = [], styleTable}) => (
    <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
      <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">State</th>
          <th className="mdl-data-table__cell--non-numeric">Name on Card</th>
          <th className="mdl-data-table__cell--non-numeric">Card Brand</th>
          <th className="mdl-data-table__cell--non-numeric">Card Number</th>
          <th className="mdl-data-table__cell--non-numeric">Expirity</th>
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
    };

    this.onSelectProject = this.onSelectProject.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCards())
    dispatch(getProjects())
    dispatch(getProjectCards())
  }

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      const { dispatch } = this.props
      dispatch(getCards())
    }

    if (this.props.projects !== prevProps.projects) {
      const { dispatch } = this.props
      dispatch(getProjects())
    }

    if (this.props.projectCards !== prevProps.projectCards) {
      const { dispatch } = this.props
      dispatch(getProjectCards())
    }
  }

  onSelectProject(project) {

    const cardIdList = projectCards[projectId]
    const selectedProjectCards = []
    if(cardIdList) {
      selectedProjectCards.push.apply(cards.filter((card => {
        return cardIdList.find(card.id);
      })))
    }

    this.setState({
      selectedProject: project
      selectedProjectCards: selectedProjectCards
    })


  }


  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
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
                                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => setModal('cardModal')}>
                                      Add Card
                                  </button>
                              </div>
                          </div>
                          <CardTable cards={selectedProjectCards} styleTable={styleTable} />
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
