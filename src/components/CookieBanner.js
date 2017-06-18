import React from 'react'

class CookieBanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {'acceptedCookie': localStorage.getItem('accepted-cookie')}
    this.acceptCookie = this.acceptCookie.bind(this)
  }

  acceptCookie () {
    localStorage.setItem('accepted-cookie', true)
    this.setState({acceptedCookie: true})
  }

  render () {
    const styleBanner = {zIndex: '30', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', textAlign: 'left'}
    const styleMessage = {margin: '2px', color: '#dadada'}
    const styleClose = {outline: 'none', textDecoration: 'none', color: '#ffffff', fontSize: '16px'}
    const styleCloseWrapper = {textAlign:'center'}
    return (
      <div style={styleBanner}>
        {!this.state.acceptedCookie &&
          <div className='content-grid mdl-grid'>
            <div className='mdl-cell mdl-cell--11-col mdl-cell--7-col-tablet mdl-cell--3-col-phone'>
              <p style={styleMessage}>
                SocialBank uses cookies or similar technology to collect information about your access to our website. <a href='/terms'>Learn more</a>
              </p>
            </div>
            <div className='mdl-layout-spacer'></div>
            <div className='mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone' style={styleCloseWrapper}>
              <a style={styleClose} onClick={this.acceptCookie}>&times;</a>
            </div>
          </div>
          }
      </div>
    )
  }
}

export default CookieBanner
