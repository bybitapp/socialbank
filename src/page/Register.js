import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, change } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import {EMAIL} from '../constants/Validation'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Select from '../components/Select'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { registerAccount } from '../actions'

const roleList = [
  {id: 'none', name: '--'},
  {id: 'ceo', name: 'CEO'},
  {id: 'partner', name: 'Founder/Partner'},
  {id: 'finance', name: 'Finance'},
  {id: 'operations', name: 'Operations'},
  {id: 'tech', name: 'Engineering'},
  {id: 'product', name: 'Product'},
  {id: 'marketing', name: 'Marketing'},
  {id: 'sales', name: 'Sales'},
  {id: 'customer', name: 'Customer Success'},
  {id: 'design', name: 'Design'}
]

const checkboxLabel = {
  link: '/terms',
  linkText: 'Terms & Conditions',
  text: 'Accept'
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
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
  if (!values.role) {
    errors.role = 'Required'
  }
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
            dispatch(ownProps.reset('register'))
            resolve()
          } else {
            toastr.error(_error)
            reject(_error)
          }
        }))
      })
    }
  })
)

const Form = ({handleSubmit}) => {
  return (
    <form className='nobottommargin' onSubmit={handleSubmit}>
      <Field name='name' label='Name:' component={Input} />
      <Field name='email' label='Work Email:' component={Input} />
      <Field name='phone' label='Phone number:' component={Input} />
      <Field name='role' label='Role' component={Select} items={roleList} />
      <Field name='password' label='Password:' component={Input} type='password' />
      <Field name='accepted' label={checkboxLabel} component={Checkbox} />
      <br />
      <div className='col_full nobottommargin'>
        <button className='button button-3d button-black nomargin' type='submit'>Book Now</button>
      </div>
    </form>
  )
}

class Register extends React.Component {
  componentDidUpdate (prevProps) {
    const { dispatch } = this.props
    dispatch(change('register', 'role', roleList[0].id))
  }

  render () {
    const { handleSubmit, submitSucceeded } = this.props
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title'>
          <div className='container clearfix'>
            <h1>Book a Demo</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Book a Demo</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='accordion accordion-lg divcenter nobottommargin clearfix' style={{ maxWidth: '550px' }}>
                <div className='acctitle'><i className='acc-closed icon-user4' /><i className='acc-open icon-ok-sign' />Schedule a free demo</div>
                <div className='acc_content clearfix'>
                  { submitSucceeded
                    ? <p>Thank you for booking a demo. We will contact you as soon as possible.</p>
                    : <Form handleSubmit={handleSubmit} />
                  }
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
