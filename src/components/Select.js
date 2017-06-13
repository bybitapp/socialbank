import React from 'react'

class Select extends React.Component {
  render () {
    const { input, name, label, items = [] } = this.props
    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <select {...input} className="mdl-textfield__input">
          {items.map(this.renderSelectOptions)}
        </select>
        <label className="mdl-textfield__label" htmlFor={name}>{label}</label>
      </div>
    )
  }
}

Select.renderSelectOptions = item => (
  <option key={item.id} value={item.id}>{item.name}</option>
)

export default Select
