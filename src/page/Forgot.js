import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'
import {EMAIL} from '../constants/Validation'
import {CAPTCHA_SITE_KEY} from '../constants/Keys'
import Captcha from '../components/Captcha'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { postForgot } from '../actions'

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
    form: 'forgotPassword',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      if (!values.captcha) {
        throw new SubmissionError({ _error: 'Captcha is required.' })
      }
      return new Promise((resolve, reject) => {
        dispatch(postForgot(values, (_error, data) => {
          if (!_error) {
            toastr.success('Password reset instructions sent!', 'Please check your email.')
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
              <li className='active'>Forgot password</li>
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
                    <Field name='email' label='Email:' component={Input} />
                    <Field name='captcha' component={Captcha} sitekey={CAPTCHA_SITE_KEY} />
                    <div className='col_full nobottommargin'>
                      <button className='button button-3d button-black nomargin' type='submit'>Password reset</button>
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
