import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import { addProject } from '../actions'
import Input from './Input'
import TextField from './TextField'
import Select from '../components/Select'
import { SubmissionError } from 'redux-form'

const projectAccess = [
  {name: 'public', id: 'public'},
  {name: 'donors', id: 'donors'},
  {name: 'private', id: 'private'}
]

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
            dispatch(ownProps.reset('projectForm'))
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

class ProjectForm extends React.Component {
  onCancel() {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('projectForm'))
    handleClose()
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    const styleCenter = {textAlign: 'center'}
    const { handleClose, open, handleSubmit, error } = this.props

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
                  <div className='mdl-layout-spacer'></div>
                </div>
              </header>
              <main className='mdl-layout__content'>
                <div className='page-content' style={styleCenter}>
                  {error && <span className='sb-error'>{error}</span>}
                  <Field name='pid' type='hidden' component='input' />
                  <Field name='name' label='Project Name' component={Input} />
                  <Field name='access' label='Project Access' component={Select} items={projectAccess} />
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
