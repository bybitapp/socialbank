import React, { Component } from 'react'

export default class NotFound extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='NotFound' {...props}>
        <p>
          <h1>
            This page isn&#39;t available
            <br />
            <h2><small>The link you followed may be broken.</small></h2>
          </h1>
        </p>
        <p>
          <h2><a href='http://sotec.io'>Go to <u>SoTec.io</u></a></h2>
        </p>
      </div>
    )
  }
}
