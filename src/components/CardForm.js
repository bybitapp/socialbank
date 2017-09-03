import React from 'react'
import ResponsiveModal from './ResponsiveModal'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Auth from '../modules/Auth'
import { reduxForm, Field, SubmissionError, formValueSelector, change } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { addCard } from '../actions'
import Select from './Select'

const selector = formValueSelector('cardForm')

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

function mapStateToProps (state) {
  const pid = selector(state, 'pid')
  const uid = selector(state, 'uid')
  const { projects, users } = state
  return {
    projects,
    users,
    pid,
    uid
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'cardForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(addCard(values, (_error) => {
          if (!_error) {
            toastr.success('Success!', 'New card created.')
            dispatch(ownProps.reset('cardForm'))
            ownProps.handleClose()
            resolve()
          } else {
            toastr.error('An unexpected error. If the error persists please report to contact@sotec.io')
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class CardForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('cardForm'))
    handleClose()
  }

  componentDidMount () {
  }

  componentDidUpdate (prevProps) {
    const { dispatch, projects, users, pid, uid } = this.props
    if (projects && projects[0] && !pid) {
      dispatch(change('cardForm', 'pid', projects[0].id))
    }
    if (users && users[0] && !uid) {
      dispatch(change('cardForm', 'uid', users[0].id))
    }
  }

  render () {
    const { handleClose, open, handleSubmit, projects, users } = this.props

    const projectList = projects.map((item, index) => {
      return {
        id: item.id,
        name: item.name
      }
    })

    const userList = users.map((item, index) => {
      return {
        id: item.id,
        name: item.profile.name + ' - ' + item.email
      }
    })

    // Add logged user to allow create his own card
    const loggedUser = Auth.getUser()
    userList.push({
      id: loggedUser.id,
      name: loggedUser.profile.name + ' - ' + loggedUser.email
    })

    return (
      <ResponsiveModal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel='Card Form'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Card Form</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                <Field name='pid' label='Project Name' component={Select} items={projectList} />
                <Field name='uid' label='User' component={Select} items={userList} />
              </div>
            </main>
            <footer className='sb-footer'>
              <div className='mdl-mega-footer__bottom-section'>
                <ul className='mdl-mega-footer__link-list'>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.onCancel.bind(this)}>Cancel</button></li>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Ok</button></li>
                </ul>
              </div>
            </footer>
          </div>
        </form>
      </ResponsiveModal>
    )
  }
}

export default enhance(CardForm)
