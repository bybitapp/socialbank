import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError, formValueSelector, change } from 'redux-form'

import { addUser } from '../actions'
import Select from '../components/Select'
import Input from './Input'
import { EMAIL } from '../constants/Validation'

const selector = formValueSelector('userForm')

const access = [
  {name: 'user', id: 'USER'},
  {name: 'admin', id: 'ADMIN'}
]

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!EMAIL.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.access) {
    errors.access = 'Required'
  }
  return errors
}

function mapStateToProps (state) {
  const uid = selector(state, 'uid')
  const isEditMode = (uid) || false
  return {
    isEditMode
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'userForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(addUser(values, (_error) => {
          if (!_error) {
            dispatch(ownProps.reset('userForm'))
            ownProps.handleClose()
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class UserForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('userForm'))
    handleClose()
  }

  componentDidMount () {
  }

  componentDidUpdate (prevProps) {
    const { isEditMode, dispatch } = this.props
    if (!isEditMode) {
      dispatch(change('userForm', 'access', access[0].id))
    }
  }

  render () {
    const styleCenter = {textAlign: 'center'}
    const { handleClose, open, handleSubmit, error, isEditMode } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='User'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>User</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content' style={styleCenter}>
                {error && <span className='sb-error'>{error}</span>}
                <Field name='uid' type='hidden' component='input' />
                <Field name='email' label='Email' component={Input} disabled={isEditMode} />
                <Field name='access' label='Access' component={Select} items={access} />
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
      </Modal>
    )
  }
}

export default enhance(UserForm)