import React from 'react'
import { compose } from 'recompose'
import { reduxForm, SubmissionError, Field } from 'redux-form'

import Input from '../components/Input'
import TextField from '../components/TextField'
import { EMAIL } from '../constants/Validation'
import { sendMessage } from '../actions'

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
            alert(data)
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class ContactForm extends React.Component {
  render () {
    const styleText = {textAlign: 'justify', padding: '0 50px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}
    const styleError = {textAlign: 'center', width: '100%'}
    const styleColor = {backgroundColor: 'white'}
    const anchorText = {'text-decoration': 'none', color: '#8bc34a'}
    const { handleSubmit, error } = this.props

    return (
      <div className="android-more-section" style={styleColor}>
        <div className="page-content">
          <div style={styleText}>
            {error && <div style={styleError}><span className="sb-error">{error}</span></div>}
            <form onSubmit={handleSubmit}>
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--4-col">
                  <div className="mdl-typography--font-light mdl-typography--display-1-color-contrast">Connect with us</div>
                  <br/>
                  Email: <a style={anchorText} href="mailto:contact@socialbank.co">contact@socialbank.co</a>
                  <br/>
                  Twitter: <a style={anchorText} href="https://twitter.com/socialbankco">@socialbankco</a>
                </div>
                <div className="mdl-cell mdl-cell--8-col">
                  <br/>
                  <Field name="name" label="Name" component={Input} />
                  <Field name="email" label="Email" component={Input} />
                  <Field name="message" label="Message" component={TextField} />
                  <div className="mdl-cell mdl-cell--12-col" style={styleButton}>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">
                    Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default enhance(ContactForm)
