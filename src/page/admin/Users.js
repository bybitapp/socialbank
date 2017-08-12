import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { getUsers } from '../../actions'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import UserForm from '../../components/UserForm'
import UserRemoveForm from '../../components/UserRemoveForm'
import Auth from '../../modules/Auth'
import { USER_ROLES, USER_ACCESS } from '../../constants/Option'

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

const userLabel = {
  name: 'Name',
  role: 'Role',
  email: 'Email',
  phone: 'Phone',
  access: 'Access',
  actions: 'Actions'
}

const roleName = (id) => {
  const role = USER_ROLES.find((r) => r.id === id)
  return (role) ? role.name : '-'
}

const ActionButton = (pid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(pid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const UserItem = ({user, actions}) => (
  <tr>
    <td data-label={userLabel.name}>{ user.profile.name }</td>
    <td data-label={userLabel.role}>{ roleName(user.profile.role) }</td>
    <td data-label={userLabel.email}>{ user.email }</td>
    <td data-label={userLabel.phone}>{ user.phone }</td>
    <td data-label={userLabel.access}>{ user.access }</td>
    <td data-label={userLabel.actions} className='sb-menu-table'>
      { actions.map((action) => ActionButton(user.id, action)) }
    </td>
  </tr>)

const UserTable = ({users = [], styleTable, actions}) => (
  <table className='responsive-table' style={styleTable}>
    <thead>
      <tr>
        <th>{userLabel.name}</th>
        <th>{userLabel.role}</th>
        <th>{userLabel.email}</th>
        <th>{userLabel.phone}</th>
        <th>{userLabel.access}</th>
        <th>{userLabel.actions}</th>
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
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getUsers())
  }

  onAdd () {
    const { setModal, dispatch } = this.props
    dispatch(change('userForm', 'access', USER_ACCESS[0].id))
    dispatch(change('userForm', 'role', USER_ROLES[0].id))
    setModal('userModal')
  }

  onEdit (uid, event) {
    const { users, setModal, dispatch } = this.props
    const user = users.find((u) => { return u.id === uid })
    if (user) {
      dispatch(change('userForm', 'uid', user.id))
      dispatch(change('userForm', 'email', user.email))
      dispatch(change('userForm', 'name', user.profile.name))
      dispatch(change('userForm', 'role', user.profile.role))
      dispatch(change('userForm', 'access', user.access))
      setModal('userModal')
    }
  }

  onRemove (uid, event) {
    const { users, setModal, dispatch } = this.props
    const user = users.find((u) => { return u.id === uid })
    if (user) {
      dispatch(change('userRemoveForm', 'uid', user.id))
      setModal('userRemoveModal')
    }
  }

  render () {
    const styleTable = {padding: '16px', margin: '5px', borderLeft: 0, borderRight: 0}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}
    const stylePadding = {padding: '15px'}

    const { modal, setModal } = this.props
    let { users } = this.props
    users = users.filter(u => u.id !== Auth.getUser().id)

    const actions = [
      {icon: 'mode_edit', onclick: this.onEdit},
      {icon: 'delete', onclick: this.onRemove}
    ]

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <UserForm open={(modal === 'userModal')} handleClose={() => setModal(null)} />
        <UserRemoveForm open={(modal === 'userRemoveModal')} handleClose={() => setModal(null)} />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col mdl-cell--4-col-phone sb-menu-side-bar'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col'>
                  <div style={stylePadding}>
                    <div className='mdl-grid'>
                      <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                        <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                          onClick={() => this.onAdd()}>
                            Add User
                        </button>
                      </div>
                    </div>
                    <UserTable users={users} styleTable={styleTable} actions={actions} />
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

export default enhance(Users)
