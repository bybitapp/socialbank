import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import { closeProject } from '../actions'
import { SubmissionError } from 'redux-form'

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
}

const enhance = compose(
  reduxForm({
    form: 'projectCloseForm',
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(closeProject(values, (_error) => {
          if (!_error) {
            dispatch(ownProps.reset('projectCloseForm'))
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

class ProjectCloseForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('projectCloseForm'))
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
        contentLabel='Close Project'
        >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Close Project</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content' style={styleCenter}>
                {error && <span className='sb-error'>{error}</span>}
                <Field name='pid' type='hidden' component='input' />
                <h5>Do you want to close selected project ?</h5>
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

export default enhance(ProjectCloseForm)
