import React, { Component } from 'react'

export default class NotFound extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='NotFound' {...props}>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    )
  }
}
