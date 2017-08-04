import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { dateFormat } from '../../util/date'
import { getProjects } from '../../actions'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import ProjectForm from '../../components/ProjectForm'
import ProjectCloseForm from '../../components/ProjectCloseForm'
import ProjectDepositForm from '../../components/ProjectDepositForm'

function mapStateToProps (state) {
  const { projects, account } = state
  return {
    projects,
    account
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal')
)

const projectLabel = {
  name: 'Name',
  createDate: 'Date Create',
  balance: 'Balance',
  actions: 'Actions'
}

const ActionButton = (pid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(pid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const ProjectItem = ({project, actions}) => (
  <tr>
    <td data-label={projectLabel.name}>{ project.name }</td>
    <td data-label={projectLabel.createDate}>{ dateFormat(project.created) }</td>
    <td data-label={projectLabel.balance}>{ (project.balances) ? project.balances.actual : 0 }</td>
    <td data-label={projectLabel.actions} className='sb-menu-table'>
      { actions.map((action) => ActionButton(project.id, action)) }
    </td>
  </tr>)

const ProjectTable = ({projects = [], styleTable, actions}) => (
  <table className='responsive-table' style={styleTable}>
    <thead>
      <tr>
        <th>{projectLabel.name}</th>
        <th>{projectLabel.createDate}</th>
        <th>{projectLabel.balance}</th>
        <th>{projectLabel.actions}</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(projects).map((key, index) => {
        const p = projects[key]
        return (<ProjectItem key={key} project={p} actions={actions} />)
      })}
    </tbody>
  </table>)

class Projects extends React.Component {
  constructor (props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
    this.onCloseProject = this.onCloseProject.bind(this)
    this.onDeposit = this.onDeposit.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getProjects())
  }

  onEdit (pid, event) {
    const { projects, setModal, dispatch } = this.props
    const project = projects.find((project) => { return project.id === pid })
    if (project) {
      dispatch(change('projectForm', 'pid', project.id))
      dispatch(change('projectForm', 'name', project.name))
      dispatch(change('projectForm', 'description', project.description))
      setModal('projectModal')
    }
  }

  onCloseProject (pid, event) {
    const { projects, setModal, dispatch } = this.props
    const project = projects.find((project) => { return project.id === pid })
    if (project) {
      dispatch(change('projectCloseForm', 'pid', project.id))
      setModal('projectCloseModal')
    }
  }

  onDeposit (pid, event) {
    const { projects, setModal, dispatch } = this.props
    const project = projects.find((project) => { return project.id === pid })
    if (project) {
      dispatch(change('projectDepositForm', 'pid', project.id))
      dispatch(change('projectDepositForm', 'name', project.name))
      setModal('projectDepositModal')
    }
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { projects, modal, setModal, account } = this.props

    const actions = [
      {icon: 'attach_money', onclick: this.onDeposit},
      {icon: 'mode_edit', onclick: this.onEdit},
      {icon: 'archive', onclick: this.onCloseProject}
    ]

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <ProjectForm open={(modal === 'projectModal')} handleClose={() => setModal(null)} account={account} />
        <ProjectCloseForm open={(modal === 'projectCloseModal')} handleClose={() => setModal(null)} />
        <ProjectDepositForm open={(modal === 'projectDepositModal')} handleClose={() => setModal(null)} />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col' style={styleBorderLeft}>
                  <div style={stylePadding}>
                    <div className='mdl-grid'>
                      <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                        <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                          onClick={() => setModal('projectModal')}>
                            Add Project
                        </button>
                      </div>
                    </div>
                    <ProjectTable projects={projects} styleTable={styleTable} actions={actions} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <Footer />
      </div>
    )
  }
}

export default enhance(Projects)
