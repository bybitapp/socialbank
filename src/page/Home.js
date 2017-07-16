import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

// import MobileNavigation from '../components/MobileNavigation'
// import ContactForm from '../components/ContactForm'
// import SubjectBox from '../components/SubjectBox'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import Map from '../components/Map'
// import CookieBanner from '../components/CookieBanner'
// import { Link } from 'react-router-dom'

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
    // const { dispatch } = this.props
    // dispatch(getOrganizations())
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
        <Header />
        <section id='slider' className='slider-parallax full-screen'>
          <div className='full-screen' style={{backgroundSize: 'cover'}}>
            <div className='container clearfix'>
              <img src='images/new/slider-iphone.png' alt='' className='hidden-sm hidden-xs' data-style-lg='position: absolute; left: 0; bottom: 0; height: auto;' data-style-md='position: absolute; left: 0; bottom: 0; height: 450px;' />
              <div className='vertical-middle no-fade'>
                <div className='col-md-6 fright nobottommargin' data-animate='fadeIn'>
                  <div className='emphasis-title'>
                    <h1 data-style-lg='font-size: 52px;' data-style-md='font-size: 44px;'>Transparency by design. Revolutionize the way every <strong>charity</strong> manages its expenses.</h1>
                  </div>
                  <div>
                    <a href='/register' className='button button-desc button-border button-rounded nomargin'>
                      <div>Create your account</div>
                    </a>
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
                <a><img src='images/new/s1.png' alt='' className='bottommargin-sm' /></a>
                <h4>Responsive Layout</h4>
                <p>Powerful Layout with Responsive functionality that can be adapted to any screen size. Resize browser to view.</p>
              </div>
              <div className='col_one_third nobottommargin center'>
                <a><img src='images/new/s4.png' alt='' className='bottommargin-sm' /></a>
                <h4>Retina Ready Graphics</h4>
                <p>Looks beautiful &amp; ultra-sharp on Retina Screen Displays. Retina Icons, Fonts &amp; all others graphics are optimized.</p>
              </div>
              <div className='col_one_third nobottommargin center col_last'>
                <a><img src='images/new/s5.png' alt='' className='bottommargin-sm' /></a>
                <h4>Powerful Performance</h4>
                <p>Canvas includes tons of optimized code that are completely customizable and deliver unmatched fast performance.</p>
              </div>
            </div>
            <div className='section nobottommargin' style={{paddingBottom: '150px'}}>
              <div className='hidden-sm hidden-xs' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent url("images/new/ipad-section.png") bottom right no-repeat' }} />
              <div className='container clearfix' style={{ zIndex: 1 }}>
                <div className='col-md-6 nobottommargin'>
                  <div className='heading-block topmargin-sm'>
                    <h2>Awesome Scalable Apps</h2>
                    <span>Our Template acts &amp; behaves truly as a Canvas.</span>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem maiores pariatur voluptatem placeat laborum iste accusamus nam unde, iure id.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet cumque, perferendis accusamus porro illo exercitationem molestias, inventore obcaecati ut omnis voluptatibus ratione odio amet magnam quidem tempore necessitatibus quaerat, voluptates excepturi voluptatem, veritatis qui temporibus.</p>
                  <a className='button button-border button-rounded button-large button-dark noleftmargin'>Start Trial</a>
                </div>
              </div>
            </div>
            <div className='section notopmargin nobottommargin'>
              <div className='container clearfix'>
                <div className='col_half nobottommargin topmargin-lg'>
                  <img src='images/new/iphone-solid.png' alt='' className='center-block' />
                </div>
                <div className='col_half nobottommargin topmargin-lg col_last'>
                  <div className='heading-block topmargin-lg'>
                    <h2>Typically Responsive</h2>
                    <span>Our App scales beautifully to different Devices.</span>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet cumque, perferendis accusamus porro illo exercitationem molestias, inventore obcaecati ut omnis voluptatibus ratione odio amet magnam quidem tempore necessitatibus quaerat, voluptates excepturi voluptatem, veritatis qui temporibus.</p>
                  <a className='button button-border button-rounded button-large button-dark noleftmargin'>View Gallery</a>
                </div>
              </div>
            </div>
            <div className='section dark notopmargin' style={{ paddingTop: '60px' }}>
              <div className='container clearfix'>
                <div className='col_one_third'>
                  <div className='feature-box fbox-plain'>
                    <div className='fbox-icon'>
                      <a><i className='icon-screen' /></a>
                    </div>
                    <h3>Responsive Layout</h3>
                    <p>Powerful Layout with Responsive functionality that can be adapted to any screen size. Resize browser to view.</p>
                  </div>
                </div>
                <div className='col_one_third'>
                  <div className='feature-box fbox-plain'>
                    <div className='fbox-icon'>
                      <a><i className='icon-eye' /></a>
                    </div>
                    <h3>Retina Ready Graphics</h3>
                    <p>Looks beautiful &amp; ultra-sharp on Retina Screen Displays. Retina Icons, Fonts &amp; all others graphics are optimized.</p>
                  </div>
                </div>
                <div className='col_one_third col_last'>
                  <div className='feature-box fbox-plain'>
                    <div className='fbox-icon'>
                      <a><i className='icon-beaker' /></a>
                    </div>
                    <h3>Powerful Performance</h3>
                    <p>Canvas includes tons of optimized code that are completely customizable and deliver unmatched fast performance.</p>
                  </div>
                </div>
                <div className='clear' />
                <div className='col_one_third nobottommargin'>
                  <div className='feature-box fbox-plain'>
                    <div className='fbox-icon'>
                      <a><i className='icon-ok' /></a>
                    </div>
                    <h3>12+ Header Designs</h3>
                    <p>We have included 12+ Header + Menu Designs for your convenience so that you can match your style.</p>
                  </div>
                </div>
                <div className='col_one_third nobottommargin'>
                  <div className='feature-box fbox-plain'>
                    <div className='fbox-icon'>
                      <a><i className='icon-thumbs-up' /></a>
                    </div>
                    <h3>Awesome Mega menu</h3>
                    <p>Completely Customizable 2 Columns, 3 Columns, 4 Columns &amp; 5 Columns Mega Menus are available with Canvas.</p>
                  </div>
                </div>
                <div className='col_one_third nobottommargin col_last'>
                  <div className='feature-box fbox-plain'>
                    <div className='fbox-icon'>
                      <a><i className='icon-magnet' /></a>
                    </div>
                    <h3>Attractive Sticky Menu</h3>
                    <p>Smooth &amp; Stylish Sticky Menu is what will make your Website differentiate with others.</p>
                  </div>
                </div>
                <div className='clear' /><div className='line' />
                <div className='heading-block center'>
                  <h2>Looks beautiful on all displays.</h2>
                </div>
                <div style={{ position: 'relative', marginBottom: '-60px' }} data-height-lg='415' data-height-md='342' data-height-sm='262' data-height-xs='160' data-height-xxs='102'>
                  <img src='images/new/chrome.png' style={{position: 'absolute', top: 0, left: 0}} data-animate='fadeInUp' alt='Chrome' />
                  <img src='images/new/ipad3.png' style={{position: 'absolute', top: 0, left: 0}} data-animate='fadeInUp' data-delay='300' alt='iPad' />
                </div>
              </div>
            </div>
            <div className='container clearfix'>
              <div className='heading-block center'>
                <h3>Available on all Major Platforms.</h3>
                <span>We have made our App available on all Major Platforms</span>
              </div>
              <p className='divcenter center' style={{ maxWidth: '800px' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo animi ab dolorem deleniti, incidunt, recusandae tenetur eius aut similique delectus nisi labore odit temporibus reprehenderit eum iure natus voluptatem commodi? Quam ea, placeat quia et dignissimos laboriosam unde earum repudiandae?</p>
              <div className='col_full center topmargin nobottommargin'>
                <a className='social-icon si-appstore si-large si-rounded si-colored inline-block' title='iOS App Store'>
                  <i className='icon-appstore' />
                  <i className='icon-appstore' />
                </a>
                <a className='social-icon si-android si-large si-rounded si-colored inline-block' title='Android Store'>
                  <i className='icon-android' />
                  <i className='icon-android' />
                </a>
                <a className='social-icon si-gplus si-large si-rounded si-colored inline-block' title='Windows Store'>
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
              <form id='widget-subscribe-form2' action='include/subscribe.php' method='post' className='nobottommargin'>
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
        <Footer />
      </div>
    )
  }
}

export default enhance(Home)
