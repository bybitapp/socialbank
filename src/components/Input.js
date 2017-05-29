import React from 'react'

class Input extends React.Component {
  render() {
      const { input, label, name, type = 'text', meta: {touched, error, warning} } = this.props;
      return (
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type={type} {...input} id={name}/>
          {!input.value && <label className="mdl-textfield__label" htmlFor={name}>{label}</label>}
          {touched && (error && <span className="sb-textfield__error">{error}</span>)}
        </div>);
  }

}

export default Input
