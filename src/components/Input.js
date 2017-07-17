import React from 'react'

class Input extends React.Component {
  render () {
    const { input, label, name, type = 'text' } = this.props
    const { disabled = false, meta: {touched, error} } = this.props
    return (
      <div className='col_full'>
        <label htmlFor={name}>{label}</label>
        <input type={type} {...input} className='form-control not-dark' disabled={disabled} />
        {touched && (error && <span className='sb-text-error'>{error}</span>)}
      </div>
    )
  }
}

export default Input
