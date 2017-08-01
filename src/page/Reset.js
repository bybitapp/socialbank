import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'

import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { postReset } from '../actions'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  } else {
    if (values.password.length < 8) {
      errors.password = 'Too small password! Use at least 8 characters.'
    } else if (values.password.length > 30) {
      errors.password = 'Too long password! 30 characters are enough.'
    } else if (values.password.search(/[A-Z]/) < 0) {
      errors.password = 'Use at least one capital letter for your security.'
    } else if (values.password.search(/[0-9]/) < 0) {
      errors.password = 'Use at least one digit for your security.'
    } else if (values.password.search(/[!@#$&*]/) < 0) {
      errors.password = 'Use at least one special character (!@#$&*) for your security.'
    }
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'resetPassword',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      const token = ownProps.match.params.token

      return new Promise((resolve, reject) => {
        dispatch(postReset(token, (_error, data) => {
          if (!_error) {
            toastr.success('Successfully reset password.')
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

class Login extends React.Component {
  render () {
    const { handleSubmit, error } = this.props
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title'>
          <div className='container clearfix'>
            <h1>Forgot password</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Reset password</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='accordion accordion-lg divcenter nobottommargin clearfix' style={{ maxWidth: '550px' }}>
                {error && (<div className='alert alert-danger'><i className='icon-remove-sign' /><strong>Oh snap!</strong> {error}</div>)}
                <div className='acctitle'><i className='acc-closed icon-user4' /><i className='acc-open icon-ok-sign' />Reset password</div>
                <div className='acc_content clearfix'>
                  <form className='nobottommargin' onSubmit={handleSubmit} >
                    {error && (<div className='alert alert-danger'><i className='icon-remove-sign' /><strong>Oh snap!</strong> {error}</div>)}
                    <Field name='password' label='Password:' component={Input} type='password' />
                    <div className='col_full nobottommargin'>
                      <button className='button button-3d button-black nomargin' type='submit'>Submit</button>
                      <a href='/login' className='fright'>Cancel</a>
                    </div>
                  </form>
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
