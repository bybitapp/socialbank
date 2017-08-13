import React from 'react'

class Captcha extends React.Component {
  render () {
    return <div ref={div => (this.container = div)} />
  }

  componentDidMount () {
    const { input: { onChange }, sitekey } = this.props

    if (window.grecaptcha) {
      window.grecaptcha.render(this.container, {
        sitekey,
        callback: onChange
      })
    }
  }
}

export default Captcha
