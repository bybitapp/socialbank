import React from 'react'
import { compose } from 'recompose'
// import { connect } from 'react-redux'
import { updatePassword } from '../actions'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'
import Input from './Input'

const validate = values => {
  const errors = {}
  if (!values.oldPassword) {
    errors.oldPassword = 'Required'
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required'
  } else {
    if (values.newPassword.length < 8) {
      errors.newPassword = 'Too small password! Use at least 8 characters.'
    } else if (values.newPassword.length > 30) {
      errors.newPassword = 'Too long password! 30 characters are enough.'
    } else if (values.newPassword.search(/[A-Z]/) < 0) {
      errors.newPassword = 'Use at least one capital letter for your security.'
    } else if (values.newPassword.search(/[0-9]/) < 0) {
      errors.newPassword = 'Use at least one digit for your security.'
    } else if (values.newPassword.search(/[!@#$&*]/) < 0) {
      errors.newPassword = 'Use at least one special character (!@#$&*) for your security.'
    }
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = 'Required'
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'updatePassword',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(updatePassword(values, (_error) => {
          if (!_error) {
            toastr.success('Updated!', 'Your password was updated.')
            dispatch(ownProps.reset('updatePassword'))
            resolve()
          } else {
            toastr.error('Unable to process your request', _error)
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class UpdatePassword extends React.Component {
  render () {
    const { handleSubmit } = this.props
    return (
      <div>
        <h5>Password Change</h5>
        <form onSubmit={handleSubmit}>
          <div className='mdl-grid'>
            <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
              <Field name='oldPassword' label='Old Password' component={Input} type='password' />
              <Field name='newPassword' label='New Password' component={Input} type='password' />
            </div>
            <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
              <Field name='repeatPassword' label='Repeat Password' component={Input} type='password' />
              <div className='sb-details-button'>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Change Password</button>
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}

export default enhance(UpdatePassword)
