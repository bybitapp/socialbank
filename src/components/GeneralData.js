import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'
import Input from './Input'
import Auth from '../modules/Auth'
import { updateAccount } from '../actions'

const validate = values => {
  const errors = {}

  if (!values.phone) {
    errors.phone = 'Required'
  } else if (values.phone.length < 6) {
    errors.phone = 'Must be 6 numbers or more'
  }

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 3) {
    errors.name = 'Must be 3 characters or more'
  } else if (values.name.length > 255) {
    errors.name = 'Must be 255 characters or less'
  }

  return errors
}

function mapStateToProps (state) {
  const { account } = state
  return {
    account
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'generalInformation',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(updateAccount(values, (_error) => {
          if (!_error) {
            toastr.success('Updated!', 'Your account has been updated')
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

const updateData = (account, dispatch) => {
  dispatch(change('generalInformation', 'name', account.profile.name))
  dispatch(change('generalInformation', 'email', account.email))
  dispatch(change('generalInformation', 'phone', account.phone))
}

class GeneralInformation extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    const user = Auth.getUser()
    if (user) {
      updateData(user, dispatch)
    }
  }

  componentDidUpdate (prevProps) {
    const { account, dispatch } = this.props
    if (account !== prevProps.account) {
      updateData(account, dispatch)
    }
  }

  render () {
    const { handleSubmit, error } = this.props
    return (
      <div>
        <h5>General Information</h5>
        <form onSubmit={handleSubmit} >
          {error && <span className='sb-error'>{error}</span>}
          <div className='mdl-grid'>
            <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
              <Field name='name' label='Name' component={Input} />
              <Field name='email' label='Email' component={Input} disabled />
            </div>
            <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
              <Field name='phone' label='Phone Number' component={Input} />
              <div className='sb-details-button'>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}

export default enhance(GeneralInformation)
