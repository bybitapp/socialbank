import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { dateFormat } from '../util/date'
import { getUsers } from '../actions'
import Header from '../components/Header'
import MobileNavigation from '../components/MobileNavigation'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import ProjectForm from '../components/ProjectForm'

function mapStateToProps (state) {
  const { users } = state
  return {
    users
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal')
)

const ActionButton = (pid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(pid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const UserItem = ({user, actions}) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>{ user.name }</td>
    <td>{ dateFormat(user.created) }</td>
    <td>{ (user.balances) ? user.balances.actual : 0 }</td>
    <td>{ user.access }</td>
    <td className='sb-menu-table'>
      { actions.map((action) => ActionButton(user.id, action)) }
    </td>
  </tr>)

const UserTable = ({users = [], styleTable, actions}) => (
  <table className='mdl-data-table mdl-data-table--selectable' style={styleTable}>
    <thead>
      <tr>
        <th className='mdl-data-table__cell--non-numeric'>Name</th>
        <th>Date Created</th>
        <th>Balance</th>
        <th>Access</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(users).map((key, index) => {
        const u = users[key]
        return (<UserItem key={key} user={u} actions={actions} />)
      })}
    </tbody>
  </table>)

class Users extends React.Component {
  constructor (props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getUsers())
  }

  onEdit (pid, event) {
    const { projects, setModal, dispatch } = this.props
    const project = projects.find((project) => { return project.id === pid })
    if (project) {
      dispatch(change('projectForm', 'pid', project.id))
      dispatch(change('projectForm', 'name', project.name))
      dispatch(change('projectForm', 'description', project.description))
      dispatch(change('projectForm', 'access', project.access))
      setModal('projectModal')
    }
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { projects, modal, setModal, account } = this.props

    const actions = [
      {icon: 'mode_edit', onclick: this.onEdit},
      {icon: 'archive', onclick: () => {}}
    ]

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header />
        <MobileNavigation />
        <ProjectForm open={(modal === 'projectModal')} handleClose={() => setModal(null)} account={account} />
        <main className='mdl-layout__content'>
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
                          Add User
                      </button>
                    </div>
                  </div>
                  <UserTable projects={projects} styleTable={styleTable} actions={actions} />
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

export default enhance(Users)
