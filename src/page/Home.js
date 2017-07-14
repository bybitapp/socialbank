import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

// import MobileNavigation from '../components/MobileNavigation'
// import ContactForm from '../components/ContactForm'
// import SubjectBox from '../components/SubjectBox'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import Map from '../components/Map'
// import CookieBanner from '../components/CookieBanner'
// import { Link } from 'react-router-dom'
import { getOrganizations } from '../actions'

function mapStateToProps (state) {
  const { organizations } = state
  return {
    organizations
  }
}

const enhance = compose(
  connect(mapStateToProps)
)

class Home extends React.Component {
  componentDidMount () {
    //const { dispatch } = this.props
    //dispatch(getOrganizations())
  }

  render () {
    // const iconStyle = {display: 'block', margin: '0 auto'}
    // const styleHeight = { height: '450px', backgroundImage: 'url(images/plexus3-1280x720.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
    // const styleButtonBottom = { marginTop: '70px', marginBottom: '40px' }
    // const styleSubSlogan = {textShadow: '5px 5px 9px black', paddingTop: 0}
    // const styleClients = { maxHeight: '150px', maxWidth: '210px', display: 'block', margin: '20px auto 0px auto' }

    // const { organizations } = this.props

    return (
      <div id='wrapper' className='clearfix'>
        <header id='header' className='full-header'>
          <div id='header-wrap'>
            <div className='container clearfix'>
              <div id='primary-menu-trigger'><i className='icon-reorder' /></div>
              <div id='logo'>
                <a href='index.html' className='standard-logo' data-dark-logo='images/logo-dark.png'><img src='images/logo.png' alt='Canvas Logo' /></a>
                <a href='index.html' className='retina-logo' data-dark-logo='images/logo-dark@2x.png'><img src='images/logo@2x.png' alt='Canvas Logo' /></a>
              </div>
              <nav id='primary-menu' >
                <ul>
                  <li className='current'><a href='index.html'><div>About us</div></a></li>
                  <li><a href='#'><div>Contact</div></a></li>
                  <li><a href='#'><div>Login</div></a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <section id='slider' className='slider-parallax full-screen'>
          <div className='full-screen' style={{backgroundSize: 'cover'}}>
            <div className='container clearfix'>
              <img src='images/new/slider-iphone.png' alt='' className='hidden-sm hidden-xs' data-style-lg='position: absolute; left: 0; bottom: 0; height: auto;' data-style-md='position: absolute; left: 0; bottom: 0; height: 450px;' />
              <div className='vertical-middle no-fade'>
                <div className='col-md-6 fright nobottommargin' data-animate='fadeIn'>
                  <div className='emphasis-title'>
                    <h1 data-style-lg='font-size: 52px;' data-style-md='font-size: 44px;'>Transparency by design. Revolutionize the way every <strong>charity</strong> manages its expenses.</h1>
                  </div>
                  <div className='hidden-xs'>
                    <a href='#' className='button button-desc button-border button-light button-rounded nomargin'><i className='icon-apple'></i><div>Start your Free Trial<span>30-Days &amp; No Credit card Required</span></div></a>
                  </div>
                  <div className='visible-xs'>
                    <a href='#' className='button button-light button-xlarge button-rounded nomargin'><i className='icon-apple'></i>Start Free Trial</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='col_one_third nobottommargin center'>
                <a href='#'><img src='images/appshowcase/s1.png' alt='Image' className='bottommargin-sm' /></a>
                <h4>Responsive Layout</h4>
                <p>Powerful Layout with Responsive functionality that can be adapted to any screen size. Resize browser to view.</p>
              </div>
              <div className='col_one_third nobottommargin center'>
                <a href='#'><img src='images/appshowcase/s4.png' alt='Image' className='bottommargin-sm' /></a>
                <h4>Retina Ready Graphics</h4>
                <p>Looks beautiful &amp; ultra-sharp on Retina Screen Displays. Retina Icons, Fonts &amp; all others graphics are optimized.</p>
              </div>
              <div className='col_one_third nobottommargin center col_last'>
                <a href='#'><img src='images/appshowcase/s5.png' alt='Image' className='bottommargin-sm' /></a>
                <h4>Powerful Performance</h4>
                <p>Canvas includes tons of optimized code that are completely customizable and deliver unmatched fast performance.</p>
              </div>
            </div>
            <div className='container clearfix'>
              <div className='heading-block center'>
                <h3>Available on all Major Platforms.</h3>
                <span>We have made our App available on all Major Platforms</span>
              </div>
              <p className='divcenter center' style={{ maxWidth: '800px' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo animi ab dolorem deleniti, incidunt, recusandae tenetur eius aut similique delectus nisi labore odit temporibus reprehenderit eum iure natus voluptatem commodi? Quam ea, placeat quia et dignissimos laboriosam unde earum repudiandae?</p>
              <div className='col_full center topmargin nobottommargin'>
                <a href='#' className='social-icon si-appstore si-large si-rounded si-colored inline-block' title='iOS App Store'>
                  <i className='icon-appstore' />
                  <i className='icon-appstore' />
                </a>
                <a href='#' className='social-icon si-android si-large si-rounded si-colored inline-block' title='Android Store'>
                  <i className='icon-android' />
                  <i className='icon-android' />
                </a>
                <a href='#' className='social-icon si-gplus si-large si-rounded si-colored inline-block' title='Windows Store'>
                  <i className='icon-windows3' />
                  <i className='icon-windows3' />
                </a>
              </div>
              <div className='clear' />
              <div className='divider divider-short divider-vshort divider-line divider-center'>&nbsp;</div>
              <div className='heading-block center'>
                <h3>Subscribe for more <span>Updates</span>.</h3>
              </div>
              <div id='widget-subscribe-form2-result' data-notify-type='success' data-notify-msg='' />
              <form id='widget-subscribe-form2' action='include/subscribe.php' role='form' method='post' className='nobottommargin'>
                <div className='input-group input-group-lg divcenter' style={{ maxWidth: '600px' }}>
                  <span className='input-group-addon'><i className='icon-email2' /></span>
                  <input type='email' name='widget-subscribe-form-email' className='form-control required email' placeholder='Enter your Email' />
                  <span className='input-group-btn'>
                    <button className='btn btn-default' type='submit'>Subscribe Now</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer id='footer' className='dark'>
          <div id='copyrights'>
            <div className='container clearfix'>
              <div className='col_half'>
                Copyrights &copy; 2014 All Rights Reserved by Canvas Inc.<br />
                <div className='copyright-links'><a href='#'>Terms of Use</a> / <a href='#'>Privacy Policy</a></div>
              </div>
              <div className='col_half col_last tright'>
                <div className='fright clearfix'>
                  <a href='#' className='social-icon si-small si-borderless si-facebook'>
                    <i className='icon-facebook' />
                    <i className='icon-facebook' />
                  </a>
                  <a href='#' className='social-icon si-small si-borderless si-twitter'>
                    <i className='icon-twitter' />
                    <i className='icon-twitter' />
                  </a>
                  <a href='#' className='social-icon si-small si-borderless si-gplus'>
                    <i className='icon-gplus' />
                    <i className='icon-gplus' />
                  </a>
                </div>
                <div className='clear' />
                <i className='icon-envelope2' /> info@canvas.com <span className='middot'>&middot;</span> <i className='icon-headphones' /> +91-11-6541-6369 <span className='middot'>&middot;</span> <i className='icon-skype2' /> CanvasOnSkype
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default enhance(Home)
