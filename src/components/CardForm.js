import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'

import { addCard, getProjects } from '../actions'
import Input from './Input'
import Select from './Select'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '5px',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    zIndex: 4
  }
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

function mapStateToProps (state) {
  const { projects } = state
  return {
    projects
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'cardForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(addCard(values, (_error) => {
          if (!_error) {
            dispatch(ownProps.reset('cardForm'))
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

class CardForm extends React.Component {
  onCancel () {
    const { handleClose, dispatch } = this.props
    dispatch(this.props.reset('cardForm'))
    handleClose()
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getProjects())
  }

  render () {
    const styleCenter = {textAlign: 'center'}
    const { handleClose, open, handleSubmit, projects, error } = this.props
    const projectList = projects.map((item, index) => {
      return {
        id: item.id,
        name: item.name
      }
    })

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Card Form'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Card Form</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content' style={styleCenter}>
                {error && <span className='sb-error'>{error}</span>}
                <Field name='cid' type='hidden' component='input' />
                <Field name='pid' label='Project Name' component={Select} items={projectList} />
                <Field name='name' label='Name On Card' component={Input} />
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

export default enhance(CardForm)
