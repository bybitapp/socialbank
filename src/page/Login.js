import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import { SubmissionError } from 'redux-form'
import { login } from '../actions'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'

const enhance = compose(
  reduxForm({
    form: 'login',
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
          dispatch(login(values, (_error, data) => {
            if (!_error){
              ownProps.history.push('/details') // temporary redirect
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
