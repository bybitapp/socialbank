import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Complaints extends React.Component {
  render () {
    const styleText = {
      fontSize: '11pt',
      color: '#000000',
      backgroundColor: 'transparent',
      fontWeight: 400,
      fontVariantLigatures: 'normal',
      fontVariantCaps: 'normal',
      textDecoration: 'none',
      verticalAlign: 'baseline',
      whiteSpace: 'pre-wrap',
      textAlign: 'justify'
    }

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='page-title' className='page-title-mini'>
          <div className='container clearfix'>
            <h1>Complaints Policy</h1>
            <ol className='breadcrumb'>
              <li><a href='/'>Home</a></li>
              <li className='active'>Complaints Policy</li>
            </ol>
          </div>
        </section>
        <section id='content'>
          <div className='content-wrap'>
            <div className='container clearfix'>
              <p style={{lineHeight: '1.2'}}><span style={{color: '#000000', fontSize: '2.25pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>&nbsp;</span></p>
              <p><span style={styleText}>Last modified: Twenty-eighth July 2017 (28/07/2017 - UK date format)</span></p>
              <p><strong><span style={{color: '#000000', fontSize: '12pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Introduction</span></strong></p>
              <p><span style={styleText}>This policy sets out the procedure for handling complaints about the Service.</span></p>
              <p><span style={styleText}>The Provider ("we", "us" or "our") will follow the procedure set out in this policy in dealing with your complaints. We will only follow the time limits set out here if you are a Consumer or a Micro-Enterprise and your complaint is about a Payment Transaction. In all other cases we will try to deal with your complaint within a time period appropriate to the relevant factors and complexity of your complaint. </span></p>
              <p><span style={styleText}>Terms not expressly defined in the complaints handling procedure are defined in the main Agreement between the provider and yourself.&nbsp;</span></p>
              <p><strong><span style={{color: '#000000', fontSize: '12pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Our Approach</span></strong></p>
              <p><span style={styleText}>We will:</span></p>
              <ul style={{marginLeft: '22px'}}>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>investigate your complaint competently, diligently and impartially;</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>assess fairly, consistently and promptly:</span></li>
                <ul style={{marginLeft: '22px'}}>
                  <li style={{listStyleType: 'circle', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>the subject matter of the complaint;</span></li>
                  <li style={{listStyleType: 'circle', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>whether the complaint should be upheld; and</span></li>
                  <li style={{listStyleType: 'circle', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>what remedial action or redress (or both) may be appropriate.</span></li>
                </ul>
              </ul>
              <p><span style={styleText}>We will (taking into account all relevant factors):</span></p>
              <ul style={{marginLeft: '22px'}}>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>offer redress or remedial action if we decide this is appropriate;</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>explain to you promptly and, in a way that is fair, clear and not misleading, our assessment of the complaint, our decision on it, and any offer of remedial action or redress; and</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline'}}><span style={styleText}>comply promptly with any offer of remedial action or redress accepted by you.</span></li>
              </ul>

              <p><strong><span style={{color: '#000000', fontSize: '12pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>How to Complain to Us</span></strong></p>
              <p><span style={styleText}>If you have a complaint or are unhappy about the Service, you should, in the first instance, contact us and we will endeavour to resolve any problems as quickly as possible.</span></p>
              <p><span style={styleText}>We recommend that if you have a complaint that you do so by e-mail to the E-mail address: </span><a style={{textDecoration: 'none'}} href='mailto:support@ixaris.com'><span style={{color: '#000000', fontSize: '11pt', fontFamily: 'Arial', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'underline', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>support@ixaris.com</span></a> <span style={styleText}>&nbsp;Alternatively you may submit your complaint to us by post) to the address: Ixaris Systems Limited, 2</span><span style={{color: '#000000', fontSize: '7.199999999999999pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'super', whiteSpace: 'pre-wrap'}}>nd</span><span style={styleText}> &nbsp;Floor, 10, Miford Place, London, W1t 5AE, United Kingdom. You must provide us with your name, address, e-mail address, the details of the Payment Transaction in question and a summary of your complaint.</span></p>
              <p><strong><span style={{color: '#000000', fontSize: '12pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Initial Response</span></strong></p>
              <p><span style={styleText}>We will respond to your complaint by the end of the next Business Day. In this response we will acknowledge our receipt of your complaint and we will confirm that we are dealing with the matter. </span></p>
              <p><span style={styleText}>A complaint sent by you to us by e-mail will be deemed to have been received on the day it is sent, provided it is sent on a Business Day before 17:30 (GMT), if the email is sent after 17.30 or on a non-Business day we will be deemed to have received the complaint the next Business Day.</span></p>
              <p><span style={styleText}>A complaint sent by you to us by post will be deemed to be received by us on the day that we receive it. </span></p>

              <p><strong><span style={{color: '#000000', fontSize: '12pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Final Response</span></strong></p>
              <p><span style={styleText}>Within four weeks of receiving your complaint we shall provide a final written response. In this response we will:</span></p>
              <ul style={{marginLeft: '22px'}}>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>either (i) offer redress or remedial action (whether or not we accept the complaint), or (ii) reject the complaint and give our reasons for doing so;</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>inform you that if you are dissatisfied with our response that you may escalate your complaint with us so that we must consider the complaint again; or </span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>if your complaint is regarding the services of your card, inform you that you may now refer your complaint to the card issuer,</span></li>

              </ul>

              <ul style={{marginLeft: '22px'}}>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>You will be deemed to have received our final written response on the same day the email was sent, and within 1 week if the response was sent by post.</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>If you do reply to our final written response as above and you chose to escalate your complaint, we will reconsider your complaint along with any additional information you provide. The above process and time frame shall be applied.</span></li>
              </ul>

              <p><strong><span style={{color: '#000000', fontSize: '12pt', backgroundColor: 'transparent', fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>Complaint Escalation and arbitration </span></strong></p>
              <p style={{lineHeight: '1.74', marginTop: '14pt', marginBottom: '14pt'}}><span style={{color: '#000000', fontSize: '12pt', fontFamily: 'Arial', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>If having exhausted the IDT Financial Services Limited complaints procedure you remain unhappy; we will &nbsp;</span></p>
              <ul style={{marginLeft: '22px'}}>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>Provide you with additional complaints escalation routes (should your complaint be regarding the services of the card) which will include the Financial Service Commission (“FSC”) in Gibraltar (when relevant, dependent on the issuer of your card), if you remain dissatisfied with the card issuers response; you may complain to the Financial Services Commission (“FSC”), PO Box 940, Suite 3, Ground Floor, Atlantic Suites, Europort Avenue, Gibraltar. Tel +350 200 40283, Fax +350 200 40282, e-mail psdcomplaints@fsc.gi, web www.fsc.gi or, or</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>Refer you to the availability of the Financial Ombudsman Service ("FOS") (if your complaint is regarding the payment services provided by Ixaris Systems Ltd). You may refer your complaint regarding the payment services offered by Ixaris Systems Ltd to the FOS which can be contacted by post at Financial Ombudsman Service (“FOS”), Exchange Tower, London E14 9SR, by telephone on 0800 023 4562, and by email at </span><a style={{textDecoration: 'none'}} href='mailto:complaint.info@financial-ombudsman.org.uk'><span style={{color: '#000000', fontSize: '12pt', fontFamily: 'Arial', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'underline', verticalAlign: 'baseline', whiteSpace: 'pre-wrap'}}>complaint.info@financial-ombudsman.org.uk</span></a><span style={styleText}> or;</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>Inform you that we will regard the matter closed if we do not receive a reply from you within eight weeks of you receiving our final written response; and</span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>Should your complaint be regarding the payments service offered by Ixaris Systems Ltd we will enclose a copy of the FOS standard explanatory leaflet (if relevant); and </span></li>
                <li style={{listStyleType: 'disc', fontSize: '10pt', backgroundColor: 'transparent', fontWeight: 400, fontVariant: 'normal', textDecoration: 'none', verticalAlign: 'baseline', marginLeft: '-3.799999999999997pt'}}><span style={styleText}>Inform you that you have a six-month period in which to complain to the FOS or if later than 6 months, but less than 3 years from the date you became aware, or ought reasonably to have been aware, that you had cause to complain. </span></li>
              </ul>
              <p style={{lineHeight: '1.2', textAlign: 'center'}}>&nbsp;</p>
              <p><span style={styleText}>If we receive a complaint that is outside the time period for a referral to the FOS, we will in the final written response inform you that the complaint is outside the time period for consideration by the FOS and that in accordance with financial regulations we have rejected the complaint.</span></p>
              <p><span style={styleText}>&nbsp;However, we will cooperate fully with the FSC and FOS and comply promptly with any settlements or awards made by them.</span></p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Complaints
