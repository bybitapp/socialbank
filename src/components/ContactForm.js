import React from 'react'
import { compose } from 'recompose'
import { reduxForm, SubmissionError, Field } from 'redux-form'

import Input from '../components/Input'
import TextField from '../components/TextField'
import { EMAIL } from '../constants/Validation'
import { sendMessage } from '../actions'
import { toastr } from 'react-redux-toastr'
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.message) {
    errors.message = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!EMAIL.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'contactForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(sendMessage(values, (_error, data) => {
          if (!_error) {
            toastr.success('Success!', 'Message sent.')
            resolve()
          } else {
            toastr.error('An unexpected error. If the error persists please report to contact@sotec.io')
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class ContactForm extends React.Component {
  render () {
    const { handleSubmit } = this.props
    return (
      <div className='postcontent nobottommargin'>
        <div id='contact-form-result' data-notify-type='success' data-notify-msg='<i className=icon-ok-sign></i> Message Sent Successfully!' />
        <form className='nobottommargin' onSubmit={handleSubmit}>
          <div className='form-process' />
          <Field name='name' label='Name' component={Input} />
          <Field name='email' label='Email' component={Input} />
          <Field name='message' label='Message' component={TextField} />
          <div className='col_full hidden'>
            <input type='text' id='template-contactform-botcheck' name='template-contactform-botcheck' value='' className='sm-form-control' />
          </div>
          <div className='col_full'>
            <button className='button button-3d nomargin' type='submit'>Send Message</button>
          </div>
        </form>
      </div>
    )
  }
}

export default enhance(ContactForm)
