import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, change } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import {EMAIL} from '../constants/Validation'
import Input from '../components/Input'
import Select from '../components/Select'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { demoAccount } from '../actions'
import { USER_ROLES, COMPANY_SIZE } from '../constants/Option'

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
  if (!values.employees) {
    errors.employees = 'Required'
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
        dispatch(demoAccount(values, (_error) => {
          if (!_error) {
            toastr.success('Success!', ' succeeded.')
            dispatch(ownProps.reset('register'))
            resolve()
          } else {
            toastr.error('An unexpected error. If the error persists please report to contact@sotec.io')
            reject(_error)
          }
        }))
      })
    }
  })
)

const Form = ({handleSubmit}) => {
  return (
    <div className='row'>
      <form className='nobottommargin' onSubmit={handleSubmit}>

        <div className='col-md-6 bottommargin-sm'>
          <Field name='name' label='Name:' component={Input} />
          <Field name='phone' label='Your Phone Number:' component={Input} />
          <Field name='employees' label='Company Size' component={Select} items={COMPANY_SIZE} />
        </div>

        <div className='col-md-6 bottommargin-sm'>
          <Field name='email' label='Your Work Email:' component={Input} />
          <Field name='role' label='Your Role' component={Select} items={USER_ROLES} />
        </div>

        <div className='col_full nobottommargin'>
          <button className='button button-3d button-black nomargin btn-block' type='submit'>Book Now</button>
        </div>
      </form>
    </div>

  )
}

class Register extends React.Component {
  componentDidMount (prevProps) {
    const { dispatch } = this.props
    dispatch(change('register', 'role', USER_ROLES[0].id))
    dispatch(change('employees', 'role', COMPANY_SIZE[0].id))
  }

  componentDidUpdate (prevProps) {
  }

  render () {
    const { handleSubmit, submitSucceeded } = this.props
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title' className='page-title-mini'>
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
                    ? <h2>Thank you for booking a demo. We will contact you as soon as possible.</h2>
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
