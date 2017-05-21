import React from 'react'

class Marker extends React.Component {

  static defaultProps = {};

  render () {
    return (
      <i className="material-icons mdl-list__item-avatar">{this.props.icon}</i>
    )
  }

}

export default Marker
