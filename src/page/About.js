import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Faq extends React.Component {
  render () {
    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title' className='page-title-mini'>
          <div className='container clearfix'>
            <h1>About SoTec</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>About</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <div className='col_full'>
                <div className='heading-block center nobottomborder'>
                  <h2>Our Vision</h2>
                  <span>We want business owners to spend more time on growth, products and employees rather than sorting out bills, expenses and unpaid invoices.</span>
                </div>

                <div className='container clearfix'>
                  <div className='col_half'>
                    <div className='heading-block fancy-title nobottomborder title-bottom-border'>
                      <h4>Why choose <span>Us</span>.</h4>
                    </div>
                    <p>Businesses have full control over their money but with even greater flexibility with more efficient options for disbursement. As funds are spent through our cards the platform will provide full visibility on expenditures to selected stakeholders.</p>
                  </div>
                  <div className='col_half col_last'>
                    <div className='heading-block fancy-title nobottomborder title-bottom-border'>
                      <h4>What we <span>Do</span>.</h4>
                    </div>
                    <p>We provide increased internal transparency through micropayments and automated expense reporting by utilizing virtual and physical prepaid debit cards on top of the award winning, low cost, open payment cloud platform.</p>
                  </div>
                </div>
              </div>
              <div className='heading-block center'>
                <h2>SoTec Thinktank</h2>
                <span>Our Team Members who have contributed immensely to our Growth</span>
              </div>
              <div className='row clearfix'>
                <div className='col-md-6 bottommargin'>
                  <div className='team team-list clearfix'>
                    <div className='team-image'>
                      <img src='/images/team/seweryn.jpg' alt='Seweryn Bidolach' />
                    </div>
                    <div className='team-desc'>
                      <div className='team-title'><h4>Seweryn Bidolach</h4><span>Co-Founder & CEO</span></div>
                      <div className='team-content'>
                        <p>
                          With over 12 years experience in small and big IT projects as a software developer and agile delivery manager.
                          I believe in creating social impact through commercial projects.
                          Privately passionate about kitesurfing and snowboarding.
                        </p>
                      </div>
                      <a href='https://www.linkedin.com/in/seweryn-bidolach' className='social-icon si-rounded si-small si-light si-linkedin'>
                        <i className='icon-linkedin' />
                        <i className='icon-linkedin' />
                      </a>
                      <a href='https://twitter.com/sbidolach' className='social-icon si-rounded si-small si-light si-twitter'>
                        <i className='icon-twitter' />
                        <i className='icon-twitter' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 bottommargin'>
                  <div className='team team-list clearfix'>
                    <div className='team-image'>
                      <img src='/images/team/phani.jpg' alt='Phaninder Pasupula' />
                    </div>
                    <div className='team-desc'>
                      <div className='team-title'><h4>Phaninder Pasupula</h4><span>Co-Founder</span></div>
                      <div className='team-content'>
                        <p>
                          Entrepreneur in the tech space with a background in Fintech, software engineering and, blockchain.
                          I build technology startups, not only from a tech perspective but from a broader business perspective.
                          Successfully grew and sold 2 businesses. Paid advisor of multiple well-funded startups in Europe.
                        </p>
                      </div>
                      <a href='https://uk.linkedin.com/in/phaninder-pasupula-aab4a02b' className='social-icon si-rounded si-small si-light si-linkedin'>
                        <i className='icon-linkedin' />
                        <i className='icon-linkedin' />
                      </a>
                      <a href='https://twitter.com/PhaniPasupula' className='social-icon si-rounded si-small si-light si-twitter'>
                        <i className='icon-twitter' />
                        <i className='icon-twitter' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 bottommargin'>
                  <div className='team team-list clearfix'>
                    <div className='team-image'>
                      <img src='/images/team/yugo.jpg' alt='Yugo Sakamoto' />
                    </div>
                    <div className='team-desc'>
                      <div className='team-title'><h4>Yugo Sakamoto</h4><span>Software Developer</span></div>
                      <div className='team-content'>
                        <p>Developing software for over 7 years and a technology lover. I have a great desire to deliver solutions which promote social impact through transparency and effectiveness.</p>
                      </div>
                      <a href='https://www.linkedin.com/in/yugo-sakamoto-8639ba22/' className='social-icon si-rounded si-small si-light si-linkedin'>
                        <i className='icon-linkedin' />
                        <i className='icon-linkedin' />
                      </a>
                      <a href='https://twitter.com/ymoto' className='social-icon si-rounded si-small si-light si-twitter'>
                        <i className='icon-twitter' />
                        <i className='icon-twitter' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 bottommargin'>
                  <div className='team team-list clearfix'>
                    <div className='team-image'>
                      <img src='/images/team/david.jpg' alt='Dawid Kowalczyk' />
                    </div>
                    <div className='team-desc'>
                      <div className='team-title'><h4>Dawid Kowalczyk</h4><span>Senior User Experience Designer</span></div>
                      <div className='team-content'>
                        <p>
                          For 4 years UX designer who is interested in managing the creative process.
                          He works with startups from the exploratory stage through prototypes to implementation and communication strategies.
                          In his work he uses visual thinking tools, creative techniques and psychological knowledge.</p>
                      </div>
                      <a href='https://www.linkedin.com/in/kowalczykdawid/' className='social-icon si-rounded si-small si-light si-linkedin'>
                        <i className='icon-linkedin' />
                        <i className='icon-linkedin' />
                      </a>
                    </div>
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
