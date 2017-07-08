import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'

import { EMAIL } from '../constants/Validation'
import { subscribeNewsletter } from '../actions'
import Input from './Input'

const customStyles = {
  overlay: {
    zIndex: 4
  }
}

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
            ownProps.handleClose()
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
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('newsletterSubscribeForm'))
    handleClose()
  }

  render () {
    const iconWrapperStyle = {height: '80px', backgroundColor: '#009688', marginBottom: '40px', paddingTop: '40px'}
    const titleStyle = {textAlign: 'center', width: '100%'}
    const iconStyle = {display: 'block', margin: '0 auto'}
    const textStyle = {color: 'darkgray', margin: '10px 0'}
    const contentStyle = {padding: '15px'}
    const { handleClose, open, handleSubmit, error } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        className='android-modal'
        contentLabel='Newsletter Subscribe'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header>
              <div className='mdl-layout__header-row' style={iconWrapperStyle}>
                <img src='images/newsletter_icon100x100.png' alt='{title}' style={iconStyle} />
              </div>
              <div className='mdl-layout__header-row'>
                <h3 className='logo-font' style={titleStyle}>Be the first to know</h3>
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div style={contentStyle}>
                <div className='mdl-dialog__content' style={textStyle}>
                  {`We'll be happy to update you with our latest releases!`}
                </div>
                {error && <span className='sb-error'>{error}</span>}
                <Field name='email' label='Email' component={Input} />
              </div>
            </main>
            <footer className='sb-footer'>
              <div className='mdl-mega-footer__bottom-section'>
                <ul className='mdl-mega-footer__link-list'>
                  <li><button className='mdl-button mdl-js-button mdl-button--colored' onClick={this.onCancel.bind(this)}>Cancel</button></li>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Submit</button></li>
                </ul>
              </div>
            </footer>
          </div>
        </form>
      </Modal>
    )
  }
}

export default enhance(NewsletterSubscribe)
