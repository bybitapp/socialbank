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
    <td className='mdl-data-table__cell--non-numeric'>{ user.profile.name }</td>
    <td>{ user.email }</td>
    <td>{ user.phone }</td>
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
        <th>Email</th>
        <th>Phone</th>
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
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getUsers())
  }

  onEdit (uid, event) {
    const { users, setModal, dispatch } = this.props
    const user = users.find((u) => { return u.id === uid })
    if (user) {
      dispatch(change('userForm', 'uid', user.id))
      dispatch(change('userForm', 'email', user.email))
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
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { users, modal, setModal } = this.props

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
                <div className='mdl-cell mdl-cell--3-col'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col' style={styleBorderLeft}>
                  <div style={stylePadding}>
                    <div className='mdl-grid'>
                      <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                        <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                          onClick={() => setModal('userModal')}>
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
