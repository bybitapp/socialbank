import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import {toastr} from 'react-redux-toastr'

import {EMAIL} from '../constants/Validation'
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
  if (!values.password) {
    errors.password = 'Required'
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
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title'>
          <div className='container clearfix'>
            <h1>Register</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Register</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='accordion accordion-lg divcenter nobottommargin clearfix' style={{ maxWidth: '550px' }}>
                {error && (<div className='alert alert-danger'><i className='icon-remove-sign' /><strong>Oh snap!</strong> {error}</div>)}
                <div className='acctitle'><i className='acc-closed icon-user4' /><i className='acc-open icon-ok-sign' />New Signup? Register for an Account</div>
                <div className='acc_content clearfix'>
                  <form className='nobottommargin' onSubmit={handleSubmit}>
                    <Field name='email' label='Email:' component={Input} />
                    <Field name='phone' label='Phone number:' component={Input} />
                    <Field name='password' label='Password:' component={Input} type='password' />
                    <Field name='accepted' label={checkboxLabel} component={Checkbox} />
                    <br />
                    <div className='col_full nobottommargin'>
                      <button className='button button-3d button-black nomargin' type='submit'>Register Now</button>
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

export default enhance(Register)
