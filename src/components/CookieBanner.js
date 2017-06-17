import React from 'react'

class CookieBanner extends React.Component {

  constructor(props) {
    super(props)
    this.state = {'acceptedCookie': localStorage.getItem('accepted-cookie')}
    this.acceptCookie = this.acceptCookie.bind(this)

  }

  acceptCookie() {
    localStorage.setItem('accepted-cookie', true)
    this.setState({acceptedCookie: true})
  }

  render () {
    const styleBanner = {zIndex:'30', width:'100%', backgroundColor:'#3f51b5', textAlign:'center'}
    const styleMessage = {margin:"2px", color:'whitesmoke'}
    const styleClose = {marginLeft:'50px', outline: 'none', textDecoration:'none', color:'white', fontSize:'16px'}
    return (
        <div style={styleBanner}>
          {!this.state.acceptedCookie && <p style={styleMessage}>
            SocialBank uses cookies or similar technology to collect information about your access to the Site or access and use of the Apps. <a href='/terms'>Learn more</a>
            <a href='#' style={styleClose} onClick={this.acceptCookie}>&times;</a>
          </p>}
        </div>
    )
  }
}

export default CookieBanner
