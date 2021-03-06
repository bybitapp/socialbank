import React from 'react'
import Modal from './ResponsiveModal'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { updateCardStatus } from '../actions'

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
}

const enhance = compose(
  reduxForm({
    form: 'cardUnblockForm',
    onSubmit: (values, dispatch, ownProps) => {
      // Set status to active (unblock)
      values.status = 'active'
      return new Promise((resolve, reject) => {
        dispatch(updateCardStatus(values, (_error) => {
          if (!_error) {
            toastr.success('Success!', 'Card has been unblocked.')
            dispatch(ownProps.reset('cardUnblockForm'))
            ownProps.handleClose()
            resolve()
          } else {
            toastr.error('Unable to process your request', _error)
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

class CardUnblockForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('cardUnblockForm'))
    handleClose()
  }

  render () {
    const { handleClose, open, handleSubmit } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Unblock Card'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Unblock Card</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                <Field name='cid' type='hidden' component='input' />
                <h5>Do you want to unblock selected card ?</h5>
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

export default enhance(CardUnblockForm)
