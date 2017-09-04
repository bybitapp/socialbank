import React from 'react'
import Modal from './ResponsiveModal'
import { compose } from 'recompose'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { addProject } from '../actions'
import TextField from './TextField'
import Input from './Input'

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 255) {
    errors.name = 'Must be 255 characters or less'
  } else if (values.name.length < 5) {
    errors.name = 'Must be 5 characters or more'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  return errors
}

const enhance = compose(
  reduxForm({
    form: 'projectForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(addProject(values, (_error) => {
          if (!_error) {
            toastr.success('Success!', 'Project has been created.')
            dispatch(ownProps.reset('projectForm'))
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

class ProjectForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('projectForm'))
    handleClose()
  }

  componentDidMount () {
  }

  componentDidUpdate (prevProps) {
  }

  render () {
    const { handleClose, open, handleSubmit } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Project'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Project</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                <Field name='pid' type='hidden' component='input' />
                <Field name='name' label='Project Name' component={Input} />
                <Field name='description' label='Description' component={TextField} />
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

export default enhance(ProjectForm)
