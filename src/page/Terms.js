import React from 'react'

import Header from '../components/Header'
import MobileNavigation from '../components/MobileNavigation'
import Footer from '../components/Footer'

class About extends React.Component {
  render () {
    const styleText = {textAlign: 'justify'}

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header />
        <MobileNavigation />
        <main className='mdl-layout__content'>
          <div className='page-content container'>
            <div className='sb-form-content sb-page' style={styleText}>
              <p className='text-center' />
              <h3>Terms of Service</h3>
              <ol>
                <li>These Terms
                  <ul>
                    <li>These terms and conditions (“Terms”) govern your use of this website (“Site”), trading as SoTec (“we”, “us” or “SoTec”).</li>
                    <li>Please read these Terms carefully as they affect your rights and liabilities under the law. If you do not agree to these Terms, please do not use this Site.</li>
                    <li>These Terms apply to your use of the Site and relationship with SoTec generally, whether you engage for the provision of other services or not. If you purchase services from us then separate terms and conditions of service will apply.</li>
                    <li>Please also see our Privacy and Data Protection Policy for information about how we collect and use your personal data.</li>
                    <li>We may update these Terms from time to time for legal or regulatory reasons or to allow the proper operation of this Site.</li>
                    <li>The changes will apply to the use of this Site after we have given notice. If you do not wish to accept the new Terms you should not continue to use this Site and its associated services. If you continue to use this Site after the date
                      on which the change comes into effect, your use of this Site indicates your agreement to be bound by the new Terms.</li>
                  </ul>
                </li>
                <li>Use of this Site
                  <ul>
                    <li>This Site is provided to you for your personal use subject to these Terms and Conditions. By using this Site you agree to be bound by these Terms.</li>
                    <li>You are responsible for ensuring that all persons who access our site through your internet connection are aware of these Terms and that they comply with them.</li>
                  </ul>
                </li>
                <li>Registering with the Site
                  <ul>
                    <li>You may be required to register to enable you to access certain sections of the Site or purchase services from us. When you register to use the Site we may ask for some of your personal information. Any personal information you provide
                      us with will be handled in accordance with our Privacy and Data Protection Policy.</li>
                    <li>If you register to use the Site you will be asked to create a password. In order to prevent fraud, you must keep this password confidential and must not disclose it or share it with anyone. If you know or suspect that someone else knows
                      your password you should notify us immediately.</li>
                    <li>If we have reason to believe that there is likely to be a breach of security or misuse of the Site through your account or the use of your password, we may require you to change your password or we may suspend your account.</li>
                  </ul>
                </li>
                <li>Intellectual property
                  <ul>
                    <li>The content of this Site is protected by copyright, trade marks, database right and other intellectual property rights. You may retrieve and display the content of this Site on a computer screen, store such content in electronic form on
                      disk (but not any server or other storage device connected to a network) or print one copy of such content for your own personal, non-commercial use, provided you keep intact all and any copyright and proprietary notices. You may not
                      otherwise reproduce, modify, copy or distribute or use for commercial purposes any of the materials or content on this Site without our written permission.</li>
                    <li>Some of the services we provide on this Site may provide content that is protected by copyright, trade marks, database rights and other intellectual property rights owned by third parties. Such intellectual property rights are licensed
                      to us and if you reproduce, modify, copy or distribute any of this content you may be infringing these third party intellectual property rights.</li>
                    <li>We do not warrant as to the accuracy of any content that is supplied by a third party and which we can provide to you under licence.</li>
                  </ul>
                </li>
                <li>Availability of this Site
                  <ul>
                    <li>Although we aim to offer you the best service possible, we make no promise that the services at this Site will meet your requirements. We cannot guarantee that the services will be fault-free. If a fault occurs with this Site you should
                      report it to us and we will attempt to correct the fault as soon as we reasonably can.</li>
                    <li>Your access to this Site may be occasionally restricted to allow for repairs, maintenance or the introduction of new facilities or services. We will attempt to restore the service as soon as we reasonably can. Access to the Site may be
                      restricted whether or not you have registered with us.</li>
                  </ul>
                </li>
                <li>Our liability
                  <ul>
                    <li>This Site may provide content from other internet sites or resources and while we try to ensure that material included on this Site is correct, reputable and of high quality, we do not make any warranties or guarantees in relation to that
                      content. If we are informed of any inaccuracies in the material on the Site we will attempt to correct the inaccuracies as soon as we reasonably can.</li>
                    <li>If we are in breach of these Terms, we will only be responsible for any losses that you suffer as a result to the extent that they are a foreseeable consequence to both of us at the time you use this Site. Our liability shall not in any
                      event include business losses such as lost data, lost profits or business interruption.</li>
                    <li>Commentary and other materials posted on this Site are not intended to amount to advice on which reliance should be placed. We shall not be liable for any losses that may be incurred by you or any visitor to this Site or by anyone who
                      may be informed of any of its contents as a result of any reliance placed on such materials.</li>
                    <li>This clause 6 shall not limit or affect our liability resulting from any services or products sold through this Site being found to be unsafe or if something we do negligently causes death or personal injury.</li>
                  </ul>
                </li>
                <li>Viruses, hacking and other offences
                  <ul>
                    <li>You must not misuse our Site by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to our Site, the server on which
                      our site is stored or any server, computer or database connected to our site. You must not attack our Site via a denial-of-service attack or a distributed denial-of service attack.</li>
                    <li>By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing
                      your identity to them. In the event of such a breach, your right to use our Site will cease immediately.</li>
                    <li>We will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material
                      due to your use of our Site or to your downloading of any material posted on it, or on any website linked to it.</li>
                  </ul>
                </li>
                <li>Third Party Sites</li>
              </ol>
              <p>As a convenience to you, this Site includes links to other web sites or material which are beyond its control. We are not responsible for content on any site outside this Site.</p>
              <ol start='9'>
                <li>Advertising and Sponsorship</li>
              </ol>
              <p>Part of this Site may contain advertising and sponsorship. Advertisers and sponsors are responsible for ensuring that material submitted for inclusion on this Site complies with relevant laws and codes. We will not be responsible to you for any error
                or inaccuracy in advertising and sponsorship material.</p>
              <ol start='10'>
                <li>International Use
                  <ul>
                    <li>We make no promise that materials on this Site are appropriate or available for use in locations outside the United Kingdom, and accessing this Site from territories where its contents are illegal or unlawful is prohibited. If you choose
                      to access this site from locations outside the United Kingdom, you do so at your own initiative and are responsible for compliance with local laws.</li>
                    <li>You shall comply with all foreign and local laws and regulations which apply to your use of our Site or our simple randomisation service in whatever country you are physically located, including without limitation, consumer law, export
                      control laws and regulations.</li>
                  </ul>
                </li>
                <li>General
                  <ul>
                    <li>If you feel that any materials appearing on our Site are offensive, objectionable or potentially defamatory please contact us by way of our contact page providing full details of the nature of your complaint and the materials to which
                      the complaint relates.</li>
                    <li>You may not transfer any of your rights under these Terms to any other person. We may transfer our rights under these Terms to another business where we reasonably believe your rights will not be affected.</li>
                    <li>If you breach these Terms and we choose to ignore this, we will still be entitled to use its rights and remedies at a later date or in any other situation where you breach the Terms and Conditions.</li>
                    <li>We shall not be responsible for any breach of these Terms caused by circumstances beyond our reasonable control.</li>
                    <li>These Terms will be subject to the laws of England and Wales. We will try to solve any disagreements quickly and efficiently. If you are not happy with the way we deal with any disagreement and you want to take court proceedings, you must
                      do so within the United Kingdom.</li>
                  </ul>
                </li>
              </ol>
              <p>If you have any queries please contact us at contact (at) sotec (dot) io</p>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default About
