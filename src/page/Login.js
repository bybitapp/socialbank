import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import {EMAIL} from '../constants/Validation'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { login } from '../actions'
import Security from '../modules/Security'

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
            toastr.success('Logged in!', 'Hello! Welcome to Sotec.')
            ownProps.history.push('/me')
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

class Login extends React.Component {
  checkKeyPressed (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this._login(e)
    }
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title' className='page-title-mini'>
          <div className='container clearfix'>
            <h1>Login</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Login</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='accordion accordion-lg divcenter nobottommargin clearfix' style={{ maxWidth: '550px' }}>
                <div className='acctitle'><i className='acc-closed icon-user4' /><i className='acc-open icon-ok-sign' />Login to your account</div>
                <div className='acc_content clearfix'>
                  <form className='nobottommargin' onSubmit={handleSubmit} >
                    <Field name='email' label='Email:' component={Input} />
                    <Field name='password' label='Password:' component={Input} type='password' />
                    <div className='col_full nobottommargin'>
                      <button className='button button-3d button-black nomargin' type='submit'>Login</button>
                      <a href='/forgot' className='fright'>Forgot Password?</a>
                    </div>
                  </form>

                  <Security.Form ref={this._setForm}>
                    <span className='faux-input'>
                      <span className='password-icon' />
                      <Security.Input className='sign-in-password' name='password' path='LoginParams.password' placeholder='Password' onKeyUp={this.checkKeyPressed}
                        baseStyle={{
                          color: '#54575b',
                          fontSize: '13px',
                          fontSmoothing: 'antialiased',
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: '400',
                          margin: '0',
                          padding: '10px',
                          textIndent: '40px',
                          '::placeholder': {
                            color: '#bbc0c8',
                            fontWeight: '200'
                          }
                        }} />
                    </span>
                  </Security.Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default enhance(Login)
