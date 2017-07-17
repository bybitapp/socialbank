import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'

import {EMAIL} from '../constants/Validation'
import Input from '../components/Input'
import { login } from '../actions'

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
            toastr.success('Logged in!', 'Hello! Welcome to SoTec.')
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
      <div id='wrapper' className='clearfix'>
        <section id='content'>
          <div className='content-wrap nopadding'>
            <div className='section nopadding nomargin' style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, background: '#444' }} />
            <div className='section nobg full-screen nopadding nomargin'>
              <div className='container vertical-middle divcenter clearfix'>
                <div className='row center'>
                  <a href='/'><img src='images/logo-dark.png' alt='Canvas Logo' /></a>
                </div>
                <div className='panel panel-default divcenter noradius noborder' style={{ maxWidth: '400px' }}>
                  <div className='panel-body' style={{ padding: '40px' }}>
                    <form className='nobottommargin' onSubmit={handleSubmit} >
                      {error && (<div className='alert alert-danger'><i className='icon-remove-sign' /><strong>Oh snap!</strong> {error}</div>)}
                      <h3 style={{ textAlign: 'center' }}>Login to your Account</h3>
                      <Field name='email' label='Email:' component={Input} />
                      <Field name='password' label='Password:' component={Input} type='password' />
                      <div className='col_full nobottommargin'>
                        <button className='button button-3d button-black nomargin' type='submit'>Login</button>
                        <a href='' className='fright'>Forgot Password?</a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='row center dark'><small style={{ fontSize: '100%' }}>Copyrights &copy; All Rights Reserved by sotec.</small></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default enhance(Login)
