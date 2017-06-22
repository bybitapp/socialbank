import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { login } from '../actions'
import Input from '../components/Input'
import Header from '../components/Header'
import MobileNavigation from '../components/MobileNavigation'
import Footer from '../components/Footer'
import {EMAIL} from '../constants/Validation'
import {toastr} from 'react-redux-toastr'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!EMAIL.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'login',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(login(values, (_error, data) => {
          if (!_error) {
            toastr.success('Logged in!', 'Hello! Welcome to SocialBank :)');
            ownProps.history.push('/me')
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class Login extends React.Component {
  render () {
    const { handleSubmit, error } = this.props
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <Header />
            <MobileNavigation />
            <main className="mdl-layout__content">
                <div className="page-content">
                    <div className="sb-form-content sb-login">
                      {error && <span className="sb-error">{error}</span>}
                        <form onSubmit={handleSubmit}>
                            <Field name="email" label="Email" component={Input} />
                            <Field name="password" label="Password" component={Input} type="password"/>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
  }
}

export default enhance(Login)
