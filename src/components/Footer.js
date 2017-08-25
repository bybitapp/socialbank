import React from 'react'

const Disclaimer = () => (
  <div id='disclaimer' style={{ textAlign: 'center', fontSize: '12px', marginBottom: '40px' }}>
    Ixaris Systems Ltd is authorised and regulated by the Financial Conduct Authority under the Payment Service Regulations 2009 for the provision of payment services. Registration number 540990. Registered address 10 Midford Place, London, W1T 5AE, United Kingdom. Ixaris Visa cards are issued by IDT Financial Services Ltd., pursuant to a licence from Visa Europe. Ixaris Mastercard cards are issued by IDT Financial Services Ltd., pursuant to licence by Mastercard International. Mastercard is a registered trademark of Mastercard International.
  </div>
)

const Copyright = () => (
  <div>
    Copyrights &copy; 2017 All Rights Reserved by SoTec.<br />
    <div className='copyright-links'>
      <a href='/terms'>Terms of Use</a> / <a href='/complaints'>Complaints Policy</a> / <a href='/privacy'>Privacy Policy</a>
    </div>
  </div>
)

const Contact = () => (
  <div>
    <div className='fright clearfix'>
      <a href='https://www.facebook.com/SoTecUK' target='_blank' rel='noopener noreferrer' className='social-icon si-small si-borderless si-facebook'>
        <i className='icon-facebook' />
        <i className='icon-facebook' />
      </a>
      <a href='https://twitter.com/SoTec_UK' target='_blank' rel='noopener noreferrer' className='social-icon si-small si-borderless si-twitter'>
        <i className='icon-twitter' />
        <i className='icon-twitter' />
      </a>
    </div>
    <div className='clear' />
    <i className='icon-envelope2' /> contact@sotec.io
    <span className='middot'>&middot;</span>
    <i className='icon-headphones' /> +44 7437 893 938
  </div>
)

const ProductLinks = () => (
  <div>
    <ul className='list-inline links'><p className='footertitle'>PRODUCT</p>
      <li><a href='https://www.sotec.io/faq'>FAQ</a></li>
      <li><a href='https://www.sotec.io/pricing'>Pricing</a></li>
    </ul>
  </div>
)

const CompanyLinks = () => (
  <div>
    <ul className='list-inline links'><p className='footertitle'>COMPANY</p>
      <li><a href='https://www.sotec.io/about'>About us</a></li>
      <li><a href='https://medium.com/sotec'>Blog</a></li>
    </ul>
  </div>
)

const ConstactLinks = () => (
  <div>
    <ul className='list-inline links'><p className='footertitle'>CONTACT</p>
      <li><a href='https://www.sotec.io/contact'>Contact us</a></li>
      <li><i className='icon-envelope2' /> contact@sotec.io</li>
      <li><i className='icon-headphones' /> +44 7437 893 938</li>
      <li>
        <div className='fright clearfix'>
          <a href='https://www.facebook.com/SoTecUK' target='_blank' rel='noopener noreferrer' className='social-icon si-small si-borderless si-facebook'>
            <i className='icon-facebook' />
            <i className='icon-facebook' />
          </a>
          <a href='https://twitter.com/SoTec_UK' target='_blank' rel='noopener noreferrer' className='social-icon si-small si-borderless si-twitter'>
            <i className='icon-twitter' />
            <i className='icon-twitter' />
          </a>
        </div>
      </li>
    </ul>
  </div>
)

const FooterLogo = () => (
  <img src='images/logo-dark.png' alt='logo' style={{width: '90px'}} />
)

class Footer extends React.Component {
  render () {
    return (
      <footer id='footer' className='dark'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-md-offset-1 col-sm-6 col-xs-6'>
              <FooterLogo />
            </div>
            <div className='col-md-2 col-sm-6 col-xs-6'>
              <ProductLinks />
            </div>
            <div className='col-md-2 col-sm-6 col-xs-6'>
              <CompanyLinks />
            </div>
            <div className='col-md-2 col-sm-6 col-xs-6'>
              <ConstactLinks />
            </div>
          </div>
        </div>
        <div id='copyrights' style={{ fontSize: '14px' }}>
          <div className='container clearfix'>
            <Disclaimer />
            <div className='col_half'>
              <Copyright />
            </div>
            <div className='col_half col_last tright'>
              <Contact />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
