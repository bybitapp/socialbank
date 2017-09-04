import React from 'react'

const isReady = () => typeof window !== 'undefined' && typeof window.grecaptcha !== 'undefined'

let readyCheck

export default class Captcha extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: isReady(),
      widget: null
    }

    if (!this.state.ready) {
      readyCheck = setInterval(this._updateReadyState.bind(this), 1000)
    }
  }

  _updateReadyState () {
    if (isReady()) {
      this.setState({
        ready: true
      })

      clearInterval(readyCheck)
    }
  }

  render () {
    return <div ref={div => (this.container = div)} />
  }

  componentDidUpdate () {
    if (this.state.ready && !this.container.hasChildNodes()) {
      const { input: { onChange }, sitekey } = this.props
      window.grecaptcha.render(this.container, {
        sitekey,
        callback: onChange
      })
    }
  }

  componentDidMount () {
    const { input: { onChange }, sitekey } = this.props

    if (this.state.ready) {
      window.grecaptcha.render(this.container, {
        sitekey,
        callback: onChange
      })
    }
  }

  componentWillUnmount () {
    clearInterval(readyCheck)
  }
}
