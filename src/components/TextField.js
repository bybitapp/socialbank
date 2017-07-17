import React from 'react'

export default ({ input, label, name, className = 'col_full', type = 'text', meta: {touched, error} }) => (
  <div className={className}>
    <label htmlFor={name}>{label} <small>*</small></label>
    <textarea className='required sm-form-control' id='{name}' rows='6' cols='30' {...input} />
    {touched && (error && <span className='sb-text-error'>{error}</span>)}
  </div>)
