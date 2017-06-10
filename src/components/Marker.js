import React from 'react'

class Marker extends React.Component {

  static defaultProps = {};

  // TODO when you click on the marker then user shoudl be redirect to organization
  // page with information about public projects

  render () {
    return (
      <i className="material-icons mdl-list__item-avatar">{this.props.icon}</i>
    )
  }

}

export default Marker
