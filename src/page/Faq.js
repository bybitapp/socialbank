import React from 'react'
import {get} from 'lodash'

import Header from '../components/Header'
import Footer from '../components/Footer'

class FaqItem extends React.Component {
  render () {
    const { question, answer } = this.props
    return (<div className='toggle faq'>
      <div className='togglet'>{question}</div>
      <div className='togglec'>{answer}</div>
    </div>)
  }
}

class Faq extends React.Component {
  componentDidMount () {
    const toggles = get(window, 'SEMICOLON.widget.toggles')
    if (toggles) {
      toggles()
    }
  }

  constructor (props) {
    super(props)
    this.state = {filterValue: '*'}
    this.onFilter = this.onFilter.bind(this)
  }

  onFilter (filter) {
    this.setState({filterValue: filter})
  }

  render () {
    const {filterValue} = this.state
    console.log(filterValue)
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
                <div id='faqs' className='faqs'>
                  <div>
                    <div className='heading-block fancy-title nobottomborder title-bottom-border'>
                      <h4>Basic questions</h4>
                    </div>
                    <FaqItem
                      question='What is SoTec?'
                      answer='SoTec provides payment card solutions to manage and simplify organisation’s funding and expenses. Our solution provides increased internal transparency through micropayments and automated expense reporting by utilizing virtual and physical prepaid debit cards on top of the award winning, low cost, open payment cloud platform.' />

                    <FaqItem
                      question='Who is the issuer of the SoTec cards?'
                      answer='SoTec cards are issued by one of Europe’s largest issuers of Prepaid Visa(s), IDT Financial Services Limited pursuant to a license from Visa International Incorporated. IDT Financial Services Limited is a regulated bank, licensed by the Financial Services Commission, Gibraltar. Registered Office: 57-63 Line Wall Road, Gibraltar. Registered No. 95716.' />

                    <FaqItem
                      question='Is SoTec for us?'
                      answer='SoTec was created for dynamic businesses with decentralized spending cultures, including the sharing of credit cards, collections of receipts, expense reports and reimbursements, causing confusion and complexity for everyone in the workplace.' />

                    <FaqItem
                      question='Is SoTec a credit card?'
                      answer='No, SoTec initially only offers Prepaid Visa cards, where only the money loaded to your account is available to spend.' />

                    <FaqItem
                      question='How do SoTec cards work?'
                      answer='Prepaid Visa cards are accepted by more than 30 million merchants worldwide. The virtual SoTec cards can be used to make any work related online purchases. Prepaid cards can be used to purchase goods in the same way as a debit or credit card but you can only make transactions when there is money in your account.' />
                  </div>

                  <div>
                    <div className='heading-block fancy-title nobottomborder title-bottom-border topmargin'>
                      <h4>How to use SoTec</h4>
                    </div>
                    <FaqItem
                      question='In which countries is SoTec available?'
                      answer='SoTec is initially available to companies in the United Kingdom. More countries will be added in due course so watch this space.' />

                    <FaqItem
                      question='How can our company transfer funds to the SoTec cards?'
                      answer='The virtual SoTec cards are Prepaid Visa cards. To use the cards, your company needs to have money in the SoTec account. An easy way of providing funds to SoTec is by use of a bank wire. After a few business days your funds will be received into a ring fenced account (which means that neither we or anyone else can access your money).' />

                    <FaqItem
                      question='Can SoTec cards be used everywhere?'
                      answer='SoTec cards can be used in more than 30 million locations worldwide, online and in stores, making corporate purchasing easy and convenient – just look for the Visa Acceptance Mark.' />

                    <FaqItem
                      question='Do I still need to do my expense reports when using SoTec?'
                      answer='No, the founding idea behind SoTec is to get rid of the expense reports. As a Manager, you can monitor all transactions in real time. All transactions can be directly exported to most accounting systems.' />
                  </div>

                  <div>
                    <div className='heading-block fancy-title nobottomborder title-bottom-border topmargin'>
                      <h4>Security questions</h4>
                    </div>
                    <FaqItem
                      question='What is SoTec’s fraud policy?'
                      answer='With SoTec, all purchases are tracked in real-time, so if you notice something suspicious, you can block the cards immediately from the SoTec web app. You are also covered by Visa Zero Liability Policy - for more information, visit <a href="https://www.visa.com/chip/personal/security/zero-liability.jsp" target="_blank" rel="noopener noreferrer">Visa</a>.' />

                    <FaqItem
                      question='How will our data be protected?'
                      answer='We take security very seriously. All data passed between our servers and third parties is 2048-bit SSL encrypted.' />
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
