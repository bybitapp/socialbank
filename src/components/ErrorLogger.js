
import React from 'react'
import { toastr } from 'react-redux-toastr'

class ErrorLogger extends React.Component {
  startErrorLog () {
    window.onerror = (message, url, line, column, error) => {
      console.log(message, url, line, column, error)

      let errorMsg = 'Something went wrong. Please contact us for any urgent issues.'

      if (error && error.message) {
        errorMsg = error.message
      }

      if (toastr) {
        toastr.error('Aw snap!', errorMsg)
      } else {
        console.log('Aw snap! ' + errorMsg)
      }
    }
  }

  componentWillMount () {
    this.startErrorLog()
  }

  render () {
    return null
  }
}

export default ErrorLogger
