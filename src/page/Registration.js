import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'

import {EMAIL, POSTCODE, IBAN_CODE, SWIFT_CODE} from '../constants/Validation'
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
  if (!values.charityName) {
    errors.charityName = 'Required'
  } else if (values.charityName.length > 255) {
    errors.charityName = 'Must be 255 characters or less'
  }
  if (!values.address) {
    errors.address = 'Required'
  }
  if (!values.postcode) {
    errors.postcode = 'Required'
  } else if (!POSTCODE.test(values.postcode)) {
    errors.postcode = 'Invalid postcode eg. EC1A 2BP'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.accountOwner) {
    errors.accountOwner = 'Required'
  }
  if (!values.charityNumber) {
    errors.charityNumber = 'Required'
  } else if (isNaN(Number(values.charityNumber))) {
    errors.charityNumber = 'Must be a number'
  }
  if (!values.bankName) {
    errors.bankName = 'Required'
  }
  if (!values.ibanCode) {
    errors.ibanCode = 'Required'
  } else if (!IBAN_CODE.test(values.ibanCode)) {
    errors.ibanCode = 'Invalid iban code eg. GB15MIDL40051512345678'
  }
  if (!values.swiftCode) {
    errors.swiftCode = 'Required'
  } else if (!SWIFT_CODE.test(values.swiftCode)) {
    errors.swiftCode = 'Invalid swift code eg. MIDLGB22'
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

class Registration extends React.Component {
  render () {
    const { handleSubmit, error } = this.props
    const checkboxLabel = {
      link: '/terms',
      linkText: 'Terms & Conditions',
      text: 'Accept'
    }

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <MobileNavigation />
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="sb-form-content">
              {error && <span className="sb-error">{error}</span>}
              <form onSubmit={handleSubmit}>
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                    <Field name="email" label="Email" component={Input} />
                    <Field name="charityName" label="Charity Name" component={Input} />
                    <Field name="charityNumber" label="Charity No" component={Input} />
                    <Field name="address" label="Address" component={Input} />
                    <Field name="postcode" label="Postcode" component={Input} />
                    <Field name="city" label="City" component={Input} />
                  </div>
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                    <Field name="password" label="Password" component={Input} type="password" />
                    <Field name="accountOwner" label="Account Owner" component={Input} />
                    <Field name="bankName" label="Bank Name" component={Input} />
                    <Field name="ibanCode" label="Iban Code" component={Input} />
                    <Field name="swiftCode" label="Swift Code" component={Input} />
                    <Field name="accepted" label={checkboxLabel} component={Checkbox}/>
                  </div>
                </div>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Create Account</button>
              </form>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default enhance(Registration)
