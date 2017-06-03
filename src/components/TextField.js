import React from 'react'

export default ({ input, label, name, type = 'text', meta: {touched, error} }) => (
  <div className="mdl-textfield mdl-js-textfield">
      <textarea className="mdl-textfield__input" type="{type}" id="{name}" rows="3" {...input} ></textarea>
      <label className="mdl-textfield__label" htmlFor="{name}">{label}</label>
      {touched && (error && <span className="sb-textfield__error">{error}</span>)}
  </div>)
