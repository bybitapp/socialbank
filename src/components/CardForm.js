import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import { addCard } from '../actions'
import Input from './Input'
import { SubmissionError } from 'redux-form'

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '5px',
        transform: 'translate(-50%, -50%)'
    },
    overlay : {
      zIndex: 4
    }
}

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }
    return errors
}

const enhance = compose(
  reduxForm({
    form: 'addCard',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        if(ownProps.projectId) {
          values.projectId = ownProps.projectId
          dispatch(addCard(values, (_error) => {
            if (!_error) {
              dispatch(ownProps.reset('addCard'))
              ownProps.handleClose()
            } else {
              reject(new SubmissionError({_error}))
            }
          }))
        }
      })
    }
  })
)

class CardForm extends React.Component {

    render() {
        const styleCenter = {textAlign: 'center'}
        const { handleClose, open, handleSubmit, error } = this.props

        return (
            <Modal
              isOpen={open}
              onRequestClose={handleClose}
              style={customStyles}
              contentLabel="Card Form"
            >
            <form onSubmit={handleSubmit}>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form">
                  <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                      <span className="mdl-layout-title">Card Form</span>
                      <div className="mdl-layout-spacer"></div>
                    </div>
                  </header>
                  <main className="mdl-layout__content">
                    <div className="page-content" style={styleCenter}>
                      {error && <span className="sb-error">{error}</span>}
                      <Field name="name" label="Name On Card" component={Input} />
                    </div>
                  </main>
                  <footer className="sb-footer">
                    <div className="mdl-mega-footer__bottom-section">
                      <ul className="mdl-mega-footer__link-list">
                        <li><button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={handleClose}>Cancel</button></li>
                        <li><button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Add</button></li>
                      </ul>
                    </div>
                  </footer>
                </div>
            </form>
            </Modal>
        )
    }
}

export default enhance(CardForm)
