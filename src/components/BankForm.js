import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Modal from './ResponsiveModal'
import { reduxForm, Field, change, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { addBankAccount, getBankAccount } from '../actions'
import {IBAN_CODE, SWIFT_CODE} from '../constants/Validation'
import Input from './Input'

const validate = values => {
  const errors = {}
  if (!values.owner) {
    errors.owner = 'Required'
  }
  if (!values.bankName) {
    errors.bankName = 'Required'
  }
  if (!values.ibanCode) {
    errors.ibanCode = 'Required'
  } else if (!IBAN_CODE.test(values.ibanCode)) {
    errors.ibanCode = 'Invalid iban code eg. GB15MIDL40051512345678'
  }
  if (!values.swiftCode) {
    errors.swiftCode = 'Required'
  } else if (!SWIFT_CODE.test(values.swiftCode)) {
    errors.swiftCode = 'Invalid swift code eg. MIDLGB22'
  }
  return errors
}

function mapStateToProps (state) {
  const { banks } = state
  return {
    banks
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'bankForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(addBankAccount(values, (_error) => {
          if (!_error) {
            toastr.success('Success!', 'Bank account has been added.')
            ownProps.handleClose()
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

const updateData = (bank, dispatch) => {
  if (bank) {
    dispatch(change('bankForm', 'owner', bank.owner))
    dispatch(change('bankForm', 'bankName', bank.bankName))
    dispatch(change('bankForm', 'ibanCode', bank.ibanCode))
    dispatch(change('bankForm', 'swiftCode', bank.swiftCode))
  }
}

class BankForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('bankForm'))
    handleClose()
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getBankAccount())
  }

  componentDidUpdate (prevProps) {
    const { banks, dispatch } = this.props
    updateData(banks, dispatch)
  }

  render () {
    const { open, handleClose, handleSubmit, banks } = this.props
    const { owner } = banks
    const button = (owner) ? 'Update Bank Account' : 'Add Bank Account'
    // TODO temporary, wee need this feature in OPC
    const buttonDisabled = !!(owner)
    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel='Bank Form'
        className='sb-modal android-modal'
        overlayClassName='sb-modal-overlay'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Bank Form</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                <Field name='owner' label='Account Owner' component={Input} disabled={buttonDisabled} />
                <Field name='bankName' label='Bank Name' component={Input} disabled={buttonDisabled} />
                <Field name='ibanCode' label='Iban Code' component={Input} disabled={buttonDisabled} />
                <Field name='swiftCode' label='Swift Code' component={Input} disabled={buttonDisabled} />
              </div>
            </main>
            <footer className='sb-footer'>
              <div className='mdl-mega-footer__bottom-section'>
                <ul className='mdl-mega-footer__link-list'>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.onCancel.bind(this)}>Cancel</button></li>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Ok</button></li>
                </ul>
              </div>
            </footer>
          </div>
        </form>
      </Modal>)
  }
}

export default enhance(BankForm)
