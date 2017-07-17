import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'

import { removeBankAccount } from '../actions'

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
}

const enhance = compose(
  reduxForm({
    form: 'bankRemoveForm',
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(removeBankAccount(values, (_error) => {
          if (!_error) {
            dispatch(ownProps.reset('bankRemoveForm'))
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

class BankRemoveForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('bankRemoveForm'))
    handleClose()
  }

  render () {
    const { handleClose, open, handleSubmit, error } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Remove Bank'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Destroy Card</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                {error && (<div className='alert alert-danger'><i className='icon-remove-sign' /><strong>Oh snap!</strong> {error}</div>)}
                <Field name='bid' type='hidden' component='input' />
                <h5>Do you want to remove selected bank ?</h5>
              </div>
            </main>
            <footer className='sb-footer'>
              <div className='mdl-mega-footer__bottom-section'>
                <ul className='mdl-mega-footer__link-list'>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.onCancel.bind(this)}>No</button></li>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Yes</button></li>
                </ul>
              </div>
            </footer>
          </div>
        </form>
      </Modal>
    )
  }
}

export default enhance(BankRemoveForm)
