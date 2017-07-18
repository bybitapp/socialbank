import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'

import { EMAIL } from '../constants/Validation'
import { subscribeNewsletter } from '../actions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!EMAIL.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'newsletterSubscribeForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(subscribeNewsletter(values, (_error) => {
          if (!_error) {
            dispatch(ownProps.reset('newsletterSubscribeForm'))
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class NewsletterSubscribe extends React.Component {
  render () {
    const { handleSubmit, error } = this.props

    return (
      <div className='container clearfix'>
        <div className='heading-block center'>
          {error && (<div className='alert alert-danger'><i className='icon-remove-sign' /><strong>Oh snap!</strong> {error}</div>)}
          <h3>Subscribe for more <span>Updates</span>.</h3>
        </div>
        <div id='widget-subscribe-form2-result' data-notify-type='success' data-notify-msg='' />
        <form onSubmit={handleSubmit} className='nobottommargin'>
          <div className='input-group input-group-lg divcenter' style={{ maxWidth: '600px' }}>
            <span className='input-group-addon'><i className='icon-email2' /></span>
            <Field type='email' name='email' label='Email' component='input' className='form-control required email' placeholder='Enter your Email' />
            <span className='input-group-btn'>
              <button className='btn btn-default' type='submit'>Subscribe Now</button>
            </span>
          </div>
        </form>
      </div>
    )
  }
}

export default enhance(NewsletterSubscribe)
