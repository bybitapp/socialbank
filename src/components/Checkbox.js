import React from 'react'
import { Link } from 'react-router-dom'

class Checkbox extends React.Component {
  render () {
    const style = {width: '13x', marginRight: '15px', marginTop: '10px'}
    const { input, label, name, type = 'checkbox' } = this.props
    const { meta: {touched, error} } = this.props
    return (
      <div className='col_full'>
        <input type={type} {...input} id={name} style={style} />
        <label style={{ marginBottom: 0 }} htmlFor={name}>{label.text} <Link to={label.link}>{label.linkText}</Link></label>
        {touched && (error && <span className='sb-text-error'>{error}</span>)}
      </div>)
  }
}

export default Checkbox
