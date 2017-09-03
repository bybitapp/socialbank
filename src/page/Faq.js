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
            <h1>FAQs</h1>
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
                  <li className=''><a data-filter='*' className='btn'>All</a></li>
                  <li className=''><a data-filter='.faq-basic' className='btn'>Basic questions</a></li>
                  <li className=''><a data-filter='.faq-using-sotec' className='btn'>How to use SoTec</a></li>
                  <li className=''><a data-filter='.faq-security' className='btn'>Security questions</a></li>
                </ul>
                <div className='clear' />
                <div id='faqs' className='faqs'>

                  <div className='toggle faq faq-basic'>
                    <div className='togglet'>What is SoTec?</div>
                    <div className='togglec' style={{display: 'none'}}>SoTec provides payment card solutions to manage and simplify organisation’s funding and expenses. Our solution provides increased internal transparency through micropayments and automated expense reporting by utilizing virtual and physical prepaid debit cards on top of the award winning, low cost, open payment cloud platform.</div>
                  </div>

                  <div className='toggle faq faq-basic'>
                    <div className='togglet'>Who is the issuer of the SoTec cards?</div>
                    <div className='togglec' style={{display: 'none'}}>SoTec cards are issued by one of Europe’s largest issuers of Prepaid Visa(s), IDT Financial Services Limited pursuant to a license from Visa International Incorporated. IDT Financial Services Limited is a regulated bank, licensed by the Financial Services Commission, Gibraltar. Registered Office: 57-63 Line Wall Road, Gibraltar. Registered No. 95716.</div>
                  </div>

                  <div className='toggle faq faq-basic'>
                    <div className='togglet'>Is SoTec for us?</div>
                    <div className='togglec' style={{display: 'none'}}>SoTec was created for dynamic businesses with decentralized spending cultures, including the sharing of credit cards, collections of receipts, expense reports and reimbursements, causing confusion and complexity for everyone in the workplace.</div>
                  </div>

                  <div className='toggle faq faq-basic'>
                    <div className='togglet'>Is SoTec a credit card?</div>
                    <div className='togglec' style={{display: 'none'}}>No, SoTec initially only offers Prepaid Visa cards, where only the money loaded to your account is available to spend.</div>
                  </div>

                  <div className='toggle faq faq-basic'>
                    <div className='togglet'>How do SoTec cards work?</div>
                    <div className='togglec' style={{display: 'none'}}>Prepaid Visa cards are accepted by more than 30 million merchants worldwide. The virtual SoTec cards can be used to make any work related online purchases. Prepaid cards can be used to purchase goods in the same way as a debit or credit card but you can only make transactions when there is money in your account.</div>
                  </div>

                  <div className='toggle faq faq-using-sotec'>
                    <div className='togglet'>In which countries is SoTec available?</div>
                    <div className='togglec' style={{display: 'none'}}>SoTec is initially available to companies in the United Kingdom. More countries will be added in due course so watch this space.</div>
                  </div>

                  <div className='toggle faq faq-using-sotec'>
                    <div className='togglet'>How can our company transfer funds to the SoTec cards?</div>
                    <div className='togglec' style={{display: 'none'}}>The virtual SoTec cards are Prepaid Visa cards. To use the cards, your company needs to have money in the SoTec account. An easy way of providing funds to SoTec is by use of a bank wire. After a few business days your funds will be received into a ring fenced account (which means that neither we or anyone else can access your money).</div>
                  </div>

                  <div className='toggle faq faq-using-sotec'>
                    <div className='togglet'>Can SoTec cards be used everywhere?</div>
                    <div className='togglec' style={{display: 'none'}}>SoTec cards can be used in more than 30 million locations worldwide, online and in stores, making corporate purchasing easy and convenient – just look for the Visa Acceptance Mark.</div>
                  </div>

                  <div className='toggle faq faq-using-sotec'>
                    <div className='togglet'>Do I still need to do my expense reports when using SoTec?</div>
                    <div className='togglec' style={{display: 'none'}}>No, the founding idea behind SoTec is to get rid of the expense reports. As a Manager, you can monitor all transactions in real time. All transactions can be directly exported to most accounting systems.</div>
                  </div>

                  <div className='toggle faq faq-security'>
                    <div className='togglet'>What is SoTec’s fraud policy?</div>
                    <div className='togglec' style={{display: 'none'}}>With SoTec, all purchases are tracked in real-time, so if you notice something suspicious, you can block the cards immediately from the SoTec web app. You are also covered by Visa Zero Liability Policy - for more information, visit <a href='https://www.visa.com/chip/personal/security/zero-liability.jsp' target='_blank'>Visa</a>.</div>
                  </div>

                  <div className='toggle faq faq-security'>
                    <div className='togglet'>How will our data be protected?</div>
                    <div className='togglec' style={{display: 'none'}}>We take security very seriously. All data passed between our servers and third parties is 2048-bit SSL encrypted.</div>
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
