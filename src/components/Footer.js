import React from 'react'

class Footer extends React.Component {
  render () {
    return (
      <footer id='footer' className='dark'>
        <div id='copyrights' style={{ fontSize: '16px' }}>
          <div className='container clearfix'>
            <div className='col_half'>
              Copyrights &copy; 2017 All Rights Reserved by SoTec.<br />
              <div className='copyright-links'>
                <a href='/terms'>Terms of Use</a> / <a href='/privacy'>Privacy Policy</a>
              </div>
            </div>
            <div className='col_half col_last tright'>
              <div className='fright clearfix'>
                <a href='https://www.facebook.com/SoTecUK' className='social-icon si-small si-borderless si-facebook'>
                  <i className='icon-facebook' />
                  <i className='icon-facebook' />
                </a>
                <a href='https://twitter.com/SoTec_UK' className='social-icon si-small si-borderless si-twitter'>
                  <i className='icon-twitter' />
                  <i className='icon-twitter' />
                </a>
              </div>
              <div className='clear' />
              <i className='icon-envelope2' /> contact@sotec.io
              <span className='middot'>&middot;</span>
              <i className='icon-headphones' /> +44 7424 760 589
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
