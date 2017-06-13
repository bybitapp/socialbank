import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import { transferCard } from '../actions'
import Input from './Input'
import { SubmissionError } from 'redux-form'

const customStyles = {
    content : {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
    overlay : {zIndex: 4}
}

const validate = values => {
    const errors = {}
    if (!values.amount) {
        errors.name = 'Required'
    } else if (isNaN(Number(values.amount))) {
        errors.amount = 'Must be a number'
    }
    return errors
}

const enhance = compose(
  reduxForm({
    form: 'cardTransferForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        const params = {
          amount: values.amount,
          pid: values.pid,
          cid: values.cid
        }
        dispatch(transferCard(params, (_error) => {
          if(!_error) {
            dispatch(ownProps.reset('cardTransferForm'))
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

class CardTransferForm extends React.Component {

  onCancel() {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('cardTransferForm'))
    handleClose()
  }

  render() {
    const styleCenter = {textAlign: 'center'}
    const { handleClose, open, handleSubmit, error } = this.props

    return (
        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          style={customStyles}
          contentLabel="Card Transfer"
        >
        <form onSubmit={handleSubmit}>
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form">
              <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                  <span className="mdl-layout-title">Card Transfer</span>
                  <div className="mdl-layout-spacer"></div>
                </div>
              </header>
              <main className="mdl-layout__content">
                <div className="page-content" style={styleCenter}>
                  {error && <span className="sb-error">{error}</span>}
                  <Field name="pid" type="hidden" component="input" />
                  <Field name="cid" type="hidden" component="input" />
                  <h5>Project</h5>
                  <Field name="projectName" label="Project Name" component={Input} disabled={true} />
                  <h5>Card</h5>
                  <Field name="cardName" label="Card Name" component={Input} disabled={true} />
                  <Field name="amount" label="Amount" component={Input} />
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

export default enhance(CardTransferForm)