import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'

import {EMAIL} from '../constants/Validation'
import MobileNavigation from '../components/MobileNavigation'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { registerAccount } from '../actions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!EMAIL.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.phone) {
    errors.phone = 'Required'
  } else if (isNaN(Number(values.phone))) {
    errors.phone = 'Must be a number'
  }
  if (!values.accepted) {
    errors.accepted = 'Required'
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'register',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(registerAccount(values, (_error) => {
          if (!_error) {
            toastr.success('Thank you for registering with us. Please login to proceed')
            ownProps.history.push('/login')
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class Register extends React.Component {
  render () {
    const { handleSubmit, error } = this.props
    const checkboxLabel = {
      link: '/terms',
      linkText: 'Terms & Conditions',
      text: 'Accept'
    }

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header />
        <MobileNavigation />
        <main className='mdl-layout__content'>
          <div className='page-content'>
            <div className='sb-form-content'>
              {error && <span className='sb-error'>{error}</span>}
              <form onSubmit={handleSubmit}>
                <div className='mdl-grid'>
                  <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
                    <Field name='email' label='Email' component={Input} />
                    <Field name='phone' label='Phone number' component={Input} />
                  </div>
                  <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
                    <Field name='password' label='Password' component={Input} type='password' />
                    <Field name='accepted' label={checkboxLabel} component={Checkbox} />
                  </div>
                </div>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Create Account</button>
              </form>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default enhance(Register)
