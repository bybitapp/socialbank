import React from 'react'

class Input extends React.Component {
  render() {
      const { input, label, name, type = 'text' } = this.props;

      const showLabel = !input.value ? true : false;

      return (
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type={type} {...input} id={name}/>
          { showLabel &&
            <label className="mdl-textfield__label" htmlFor={name}>{label}</label>
          }
        </div>);
  }

}

export default Input
