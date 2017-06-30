import React from 'react'
import Modal from 'react-modal'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import Input from './Input'
import TextField from './TextField'

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

const enhance = compose(
  reduxForm({
    form: 'addMe',
    onSubmit: (values, dispatch, ownProps) => {
      axios.post('/api/account', values)
        .then(() => ownProps.handleClose())
        .catch((e) => {
          console.log(e)
          ownProps.handleClose()
        })
    }
  })
)

class AddMeForm extends React.Component {
  render () {
    const { handleClose, open, handleSubmit } = this.props

    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Add Me To Project'
      >
        <form onSubmit={handleSubmit}>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
            <header className='mdl-layout__header'>
              <div className='mdl-layout__header-row'>
                <span className='mdl-layout-title'>Add Me To Project</span>
                <div className='mdl-layout-spacer' />
              </div>
            </header>
            <main className='mdl-layout__content'>
              <div className='page-content'>
                <Field name='firstName' label='First name' component={Input} />
                <Field name='LastName' label='Last name' component={Input} />
                <Field name='description' label='Description' component={TextField} />
              </div>
            </main>
            <footer className='sb-footer'>
              <div className='mdl-mega-footer__bottom-section'>
                <ul className='mdl-mega-footer__link-list'>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={handleClose}>Cancel</button></li>
                  <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>Add</button></li>
                </ul>
              </div>
            </footer>
          </div>
        </form>
      </Modal>
    )
  }
}

export default enhance(AddMeForm)
