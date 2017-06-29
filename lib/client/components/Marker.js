import React from 'react'
import { Link } from 'react-router-dom'

class Marker extends React.Component {
  render () {
    return (
      <Link to={ '/public/o/' + this.props.id }>
        <i className='material-icons sb-map-icon'>{this.props.icon}</i>
      </Link>
    )
  }
}

export default Marker
