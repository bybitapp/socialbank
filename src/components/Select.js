import React from 'react'

class Select extends React.Component {
  renderSelectOptions (item) {
    return (
      <option key={item.id} value={item.id}>{item.name}</option>
    )
  }

  render () {
    const { input, name, label, items = [], className = 'col_full' } = this.props
    return (
      <div className={className}>
        <label htmlFor={name}>{label}</label>
        <select {...input} className='sm-form-control'>
          {items.map(this.renderSelectOptions)}
        </select>
      </div>
    )
  }
}

export default Select
