import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Faq extends React.Component {
  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title'>
          <div className='container clearfix'>
            <h1>FAQS</h1>
            <span>All your Questions answered in one place</span>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>FAQs</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='postcontent nobottommargin clearfix'>
                <ul id='portfolio-filter' className='portfolio-filter clearfix'>
                  <li className='activeFilter'><a data-filter='all'>All</a></li>
                  <li className=''><a data-filter='.faq-marketplace'>Marketplace</a></li>
                  <li className=''><a data-filter='.faq-authors'>Authors</a></li>
                  <li><a data-filter='.faq-legal'>Legal</a></li>
                  <li><a data-filter='.faq-itemdiscussion'>Item Discussion</a></li>
                  <li><a data-filter='.faq-affiliates'>Affiliates</a></li>
                  <li><a data-filter='.faq-miscellaneous'>Miscellaneous</a></li>
                </ul>
                <div className='clear' />
                <div id='faqs' className='faqs'>
                  <div className='toggle faq faq-marketplace faq-authors'>
                    <div className='togglet'><i className='toggle-closed icon-question-sign' /><i className='toggle-open icon-question-sign' />How do I become an author?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-authors faq-miscellaneous'>
                    <div className='togglet'><i className='toggle-closed icon-comments-alt' /><i className='toggle-open icon-comments-alt' />Helpful Resources for Authors</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-miscellaneous'>
                    <div className='togglet'><i className='toggle-closed icon-lock3' /><i className='toggle-open icon-lock3' />How much money can I make?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-authors faq-legal faq-itemdiscussion'>
                    <div className='togglet'><i className='toggle-closed icon-download-alt' /><i className='toggle-open icon-download-alt' />Can I offer my items for free on a promotional basis?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-marketplace faq-authors'>
                    <div className='togglet'><i className='toggle-closed icon-ok' /><i className='toggle-open icon-ok' />An Introduction to the Marketplaces for Authors</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-affiliates faq-miscellaneous'>
                    <div className='togglet'><i className='toggle-closed icon-money' /><i className='toggle-open icon-money' />How does the Tuts+ Premium affiliate program work?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-legal faq-itemdiscussion'>
                    <div className='togglet'><i className='toggle-closed icon-picture' /><i className='toggle-open icon-picture' />What Images, Videos, Code or Music Can I Use in my Items?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-legal faq-authors faq-itemdiscussion'>
                    <div className='togglet'><i className='toggle-closed icon-file3' /><i className='toggle-open icon-file3' />Can I use trademarked names in my items?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-affiliates'>
                    <div className='togglet'><i className='toggle-closed icon-bar-chart' /><i className='toggle-open icon-bar-chart' />Tips for Increasing Your Referral Income</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                  <div className='toggle faq faq-marketplace faq-itemdiscussion'>
                    <div className='togglet'><i className='toggle-closed icon-credit' /><i className='toggle-open icon-credit' />How do I pay for items on the Marketplaces?</div>
                    <div className='togglec' style={{display: 'none'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero
                      eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</div>
                  </div>
                </div>
              </div>
              <div className='sidebar nobottommargin col_last clearfix'>
                <div className='sidebar-widgets-wrap'>
                  <div className='widget widget_links clearfix'>
                    <h4>Pages</h4>
                    <ul>
                      <li>
                        <a>
                          <div>About Us</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>About Us - Layout 2</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>About Me</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Team Members</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Careers</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Side Navigation</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Page Submenu</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Services - Layout 1</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Services - Layout 2</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Services - Layout 3</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>FAQs - Layout 1</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>FAQs - Layout 2</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>FAQs - Layout 3</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>FAQs - Layout 4</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Full Width Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Full Width - Wide Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Right Sidebar Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Left Sidebar Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Both Sidebar Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Both Right Sidebar Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Both Left Sidebar Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Maintenance Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Blank Page</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Sitemap</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>Login/Register</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>404 - Simple Layout</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>404 - Parallax Image</div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div>404 - HTML5 Video</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='widget clearfix'>
                    <h4>Recent Posts</h4>
                    <div id='post-list-footer'>
                      <div className='spost clearfix'>
                        <div className='entry-image'>
                          <a className='nobg'><img src='http://canvashtml-cdn.semicolonweb.com/images/magazine/small/1.jpg' alt='' /></a>
                        </div>
                        <div className='entry-c'>
                          <div className='entry-title'>
                            <h4><a>Lorem ipsum dolor sit amet, consectetur</a></h4>
                          </div>
                          <ul className='entry-meta'>
                            <li>10th July 2014</li>
                          </ul>
                        </div>
                      </div>
                      <div className='spost clearfix'>
                        <div className='entry-image'>
                          <a className='nobg'><img src='http://canvashtml-cdn.semicolonweb.com/images/magazine/small/2.jpg' alt='' /></a>
                        </div>
                        <div className='entry-c'>
                          <div className='entry-title'>
                            <h4><a>Elit Assumenda vel amet dolorum quasi</a></h4>
                          </div>
                          <ul className='entry-meta'>
                            <li>10th July 2014</li>
                          </ul>
                        </div>
                      </div>
                      <div className='spost clearfix'>
                        <div className='entry-image'>
                          <a className='nobg'><img src='http://canvashtml-cdn.semicolonweb.com/images/magazine/small/3.jpg' alt='' /></a>
                        </div>
                        <div className='entry-c'>
                          <div className='entry-title'>
                            <h4><a>Debitis nihil placeat, illum est nisi</a></h4>
                          </div>
                          <ul className='entry-meta'>
                            <li>10th July 2014</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='widget clearfix'>
                    <h4>Connect with Us</h4>
                    <a className='social-icon si-colored si-small si-facebook' data-toggle='tooltip' data-placement='top' title='' data-original-title='Facebook'>
                      <i className='icon-facebook' />
                      <i className='icon-facebook' />
                    </a>
                    <a className='social-icon si-colored si-small si-delicious' data-toggle='tooltip' data-placement='top' title='' data-original-title='Delicious'>
                      <i className='icon-delicious' />
                      <i className='icon-delicious' />
                    </a>
                    <a className='social-icon si-colored si-small si-android' data-toggle='tooltip' data-placement='top' title='' data-original-title='Android'>
                      <i className='icon-android' />
                      <i className='icon-android' />
                    </a>
                    <a className='social-icon si-colored si-small si-gplus' data-toggle='tooltip' data-placement='top' title='' data-original-title='Google Plus'>
                      <i className='icon-gplus' />
                      <i className='icon-gplus' />
                    </a>
                    <a className='social-icon si-colored si-small si-stumbleupon' data-toggle='tooltip' data-placement='top' title='' data-original-title='Stumbleupon'>
                      <i className='icon-stumbleupon' />
                      <i className='icon-stumbleupon' />
                    </a>
                    <a className='social-icon si-colored si-small si-foursquare' data-toggle='tooltip' data-placement='top' title='' data-original-title='Foursquare'>
                      <i className='icon-foursquare' />
                      <i className='icon-foursquare' />
                    </a>
                    <a className='social-icon si-colored si-small si-forrst' data-toggle='tooltip' data-placement='top' title='' data-original-title='Forrst'>
                      <i className='icon-forrst' />
                      <i className='icon-forrst' />
                    </a>
                    <a className='social-icon si-colored si-small si-digg' data-toggle='tooltip' data-placement='top' title='' data-original-title='Digg'>
                      <i className='icon-digg' />
                      <i className='icon-digg' />
                    </a>
                    <a className='social-icon si-colored si-small si-spotify' data-toggle='tooltip' data-placement='top' title='' data-original-title='Spotify'>
                      <i className='icon-spotify' />
                      <i className='icon-spotify' />
                    </a>
                    <a className='social-icon si-colored si-small si-reddit' data-toggle='tooltip' data-placement='top' title='' data-original-title='Reddit'>
                      <i className='icon-reddit' />
                      <i className='icon-reddit' />
                    </a>
                    <a className='social-icon si-colored si-small si-blogger' data-toggle='tooltip' data-placement='top' title='' data-original-title='Blogger'>
                      <i className='icon-blogger' />
                      <i className='icon-blogger' />
                    </a>
                    <a className='social-icon si-colored si-small si-dribbble' data-toggle='tooltip' data-placement='top' title='' data-original-title='Dribbble'>
                      <i className='icon-dribbble' />
                      <i className='icon-dribbble' />
                    </a>
                    <a className='social-icon si-colored si-small si-flickr' data-toggle='tooltip' data-placement='top' title='' data-original-title='Flickr'>
                      <i className='icon-flickr' />
                      <i className='icon-flickr' />
                    </a>
                    <a className='social-icon si-colored si-small si-linkedin' data-toggle='tooltip' data-placement='top' title='' data-original-title='Linked In'>
                      <i className='icon-linkedin' />
                      <i className='icon-linkedin' />
                    </a>
                    <a className='social-icon si-colored si-small si-rss' data-toggle='tooltip' data-placement='top' title='' data-original-title='RSS'>
                      <i className='icon-rss' />
                      <i className='icon-rss' />
                    </a>
                    <a className='social-icon si-colored si-small si-skype' data-toggle='tooltip' data-placement='top' title='' data-original-title='Skype'>
                      <i className='icon-skype' />
                      <i className='icon-skype' />
                    </a>
                    <a className='social-icon si-colored si-small si-twitter' data-toggle='tooltip' data-placement='top' title='' data-original-title='Twitter'>
                      <i className='icon-twitter' />
                      <i className='icon-twitter' />
                    </a>
                    <a className='social-icon si-colored si-small si-youtube' data-toggle='tooltip' data-placement='top' title='' data-original-title='Youtube'>
                      <i className='icon-youtube' />
                      <i className='icon-youtube' />
                    </a>
                    <a className='social-icon si-colored si-small si-vimeo' data-toggle='tooltip' data-placement='top' title='' data-original-title='Vimeo'>
                      <i className='icon-vimeo' />
                      <i className='icon-vimeo' />
                    </a>
                    <a className='social-icon si-colored si-small si-yahoo' data-toggle='tooltip' data-placement='top' title='' data-original-title='Yahoo'>
                      <i className='icon-yahoo' />
                      <i className='icon-yahoo' />
                    </a>
                    <a className='social-icon si-colored si-small si-github' data-toggle='tooltip' data-placement='top' title='' data-original-title='Github'>
                      <i className='icon-github-circled' />
                      <i className='icon-github-circled' />
                    </a>
                    <a className='social-icon si-colored si-small si-tumblr' data-toggle='tooltip' data-placement='top' title='' data-original-title='Trumblr'>
                      <i className='icon-tumblr' />
                      <i className='icon-tumblr' />
                    </a>
                    <a className='social-icon si-colored si-small si-instagram' data-toggle='tooltip' data-placement='top' title='' data-original-title='Instagram'>
                      <i className='icon-instagram' />
                      <i className='icon-instagram' />
                    </a>
                    <a className='social-icon si-colored si-small si-pinterest' data-toggle='tooltip' data-placement='top' title='' data-original-title='Pinterst'>
                      <i className='icon-pinterest' />
                      <i className='icon-pinterest' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Faq
