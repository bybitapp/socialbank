import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'

import { EMAIL } from '../constants/Validation'
import { subscribeNewsletter } from '../actions'
import Input from './Input'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '5px',
    transform: 'translate(-50%, -50%)'
  },
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
    const styleCenter = {textAlign: 'center'}
    const { handleClose, open, handleSubmit, error } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Newsletter Subscribe"
      >
        <form onSubmit={handleSubmit}>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form">
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Newsletter Subscribe</span>
                <div className="mdl-layout-spacer"></div>
              </div>
            </header>
            <main className="mdl-layout__content">
              <div className="page-content" style={styleCenter}>
                {error && <span className="sb-error">{error}</span>}
                <Field name="email" label="Email" component={Input} />
              </div>
            </main>
            <footer className="sb-footer">
              <div className="mdl-mega-footer__bottom-section">
                <ul className="mdl-mega-footer__link-list">
                  <li><button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.onCancel.bind(this)}>Cancel</button></li>
                  <li><button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Ok</button></li>
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
