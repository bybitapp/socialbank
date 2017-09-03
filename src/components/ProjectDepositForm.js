import React from 'react'
import Modal from './ResponsiveModal'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError, formValueSelector, change } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { depositProject, getBankAccounts } from '../actions'
import Input from './Input'
import Select from './Select'

const selector = formValueSelector('projectDepositForm')

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
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

function mapStateToProps (state) {
  const bid = selector(state, 'bid')
  const { banks } = state
  const bankOptions = banks.map((bank) => { return { name: bank.bankName, id: bank.id } })
  return {
    bankOptions,
    bid
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'projectDepositForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        const params = {
          amount: values.amount,
          pid: values.pid,
          bid: values.bid
        }
        dispatch(depositProject(params, (_error) => {
          if (!_error) {
            toastr.success('Success!', 'Deposit succeeded.')
            dispatch(ownProps.reset('projectDepositForm'))
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

class ProjectDepositForm extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getBankAccounts())
  }

  componentDidUpdate () {
    const { dispatch, bankOptions, bid } = this.props
    if (bankOptions && bankOptions[0] && !bid) {
      dispatch(change('projectDepositForm', 'bid', bankOptions[0].id))
    }
  }

  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('projectDepositForm'))
    handleClose()
  }

  render () {
    const { handleClose, open, handleSubmit, bankOptions } = this.props
    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Project Deposit'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Project Deposit</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                <Field name='pid' type='hidden' component='input' />
                <h5>External account</h5>
                <Field name='bid' label='Bank' component={Select} items={bankOptions} />
                <h5>Project</h5>
                <Field name='name' label='Project Name' component={Input} disabled />
                <Field name='amount' label='Amount' component={Input} />
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
      </Modal>
    )
  }
}

export default enhance(ProjectDepositForm)
