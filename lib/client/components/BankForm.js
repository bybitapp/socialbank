import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import { addBankAccount, getBankAccount } from '../actions'
import { toastr } from 'react-redux-toastr'
import Input from './Input'
import {IBAN_CODE, SWIFT_CODE} from '../constants/Validation'
import { SubmissionError } from 'redux-form'

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

function mapStateToProps(state) {
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
            if (values.id) {
              toastr.success('Bank Account Updated.')
            } else {
              toastr.success('Bank Account Added.')
            }
            resolve()
          } else {
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
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getBankAccount())
  }

  componentDidUpdate(prevProps) {
    const { banks, dispatch } = this.props
    updateData(banks, dispatch)
  }

  render() {
    const { handleSubmit, banks, error } = this.props
    const { owner } = banks
    const button = (owner) ? 'Update Bank Account' : 'Add Bank Account'
      // TODO temporary, wee need this feature in OPC
    const buttonDisabled = !!owner
    return (
        <div>
          {error && <span className='sb-error'>{error}</span>}
          <h5>External Account</h5>
          <form onSubmit={handleSubmit}>
          <div className='mdl-grid'>
              <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
                  <Field name='owner' label='Account Owner' component={Input} disabled={buttonDisabled} />
                  <Field name='bankName' label='Bank Name' component={Input} disabled={buttonDisabled} />
              </div>
              <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
                  <Field name='ibanCode' label='Iban Code' component={Input} disabled={buttonDisabled} />
                  <Field name='swiftCode' label='Swift Code' component={Input} disabled={buttonDisabled} />
                  <div className='sb-details-button'>
                    <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit' disabled={buttonDisabled}>{button}</button>
                  </div>
              </div>
          </div>
          </form>
        </div>)
  }
}

export default enhance(BankForm)
