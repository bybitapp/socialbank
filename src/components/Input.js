import React from 'react'

export default ({ input, label, name, type = 'text' }) => (
  <div className="mdl-textfield mdl-js-textfield">
      <input className="mdl-textfield__input" type="type" {...input} id="{name}"/>
      <label className="mdl-textfield__label" htmlFor="{name}">{label}</label>
  </div>)
