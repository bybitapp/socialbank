import React from 'react'
import { Link } from 'react-router-dom'

class Checkbox extends React.Component {
  render() {
    const style = {width: '13x', marginRight: '15px', marginTop: '10px'}
    const styleLeft = {textAlign: 'left'}
    const { input, label, name, type = 'checkbox', meta: {touched, error} } = this.props;
    return (
      <div className="mdl-textfield" style={styleLeft}>
        <input type={type} {...input} id={name} style={style} />
        <label className="sb-label-checkbox" htmlFor={name}>{label.text} <Link className="sb-link-checkbox" to={label.link}>{label.linkText}</Link></label>
        {touched && (error && <span className="sb-textfield__error">{error}</span>)}
      </div>);
  }

}

export default Checkbox
