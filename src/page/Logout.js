import { Component } from 'react'
import {
    connect
} from 'react-redux'
import { logout } from '../actions'

class Logout extends Component {
  componentWillMount () {
    const { dispatch, selectedProject } = this.props
    dispatch(logout())
    this.props.history.push('/')
  }

  render () {
    return null
  }
}

export default connect()(Logout);
