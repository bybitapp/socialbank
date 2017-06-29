import React from 'react'

class Input extends React.Component {
  render () {
    const { input, label, name, type = 'text', disabled = false, meta: {touched, error} } = this.props
    const styleLabel = {visibility: 'visible'}
    return (
      <div className='mdl-textfield mdl-js-textfield'>
        {disabled && <input className='mdl-textfield__input' type={type} {...input} id={name} disabled />}
        {!disabled && <input className='mdl-textfield__input' type={type} {...input} id={name} />}
        <label className='mdl-textfield__label' style={styleLabel} htmlFor={name}>{label}</label>
        {touched && (error && <span className='sb-textfield__error'>{error}</span>)}
      </div>)
  }
}

export default Input
