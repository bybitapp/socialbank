import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import { depositProject } from '../actions'
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
    form: 'projectDepositForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        const params = {
          amount: values.amount,
          pid: values.pid
        }
        dispatch(depositProject(params, (_error) => {
          if(!_error) {
            dispatch(ownProps.reset('projectDepositForm'))
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

class ProjectDepositForm extends React.Component {

  onCancel() {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('projectDepositForm'))
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
          contentLabel="Project Deposit"
        >
        <form onSubmit={handleSubmit}>
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form">
              <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                  <span className="mdl-layout-title">Project Deposit</span>
                  <div className="mdl-layout-spacer"></div>
                </div>
              </header>
              <main className="mdl-layout__content">
                <div className="page-content" style={styleCenter}>
                  {error && <span className="sb-error">{error}</span>}
                  <Field name="pid" type="hidden" component="input" />
                  <h5>External account</h5>
                  <Field name="bank" label="Bank Name" component={Input} disabled={true} />
                  <Field name="iban" label="Iban Code" component={Input} disabled={true} />
                  <h5>Project</h5>
                  <Field name="name" label="Project Name" component={Input} disabled={true} />
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

export default enhance(ProjectDepositForm)
