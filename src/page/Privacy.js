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
              <h3>Privacy and Data Protection Policy</h3>
              <p />
              <p>1. General</p>
              <p>1.1 SoTec (“we” or “us”) take the privacy of your information very seriously. Our privacy and data protection policy (“Privacy Policy”) is designed to tell you about our practices regarding the collection,
                  use and disclosure of information that you may provide to us.
              </p>
              <p>1.2 By using any services we offer, you are consenting to the collection, use, and disclosure of that information about you in accordance with, and are agreeing to be bound by, this Privacy Policy.</p>
              <p>2. Ways that we collect information</p>
              <p>2.1 We may collect and process the following personal information or data (information that can be uniquely identified with you) about you:</p>
              <p>2.1.1 Certain information required to register with us or to access other services provided by us, including your name, address and date of birth;</p>
              <p>2.1.2 Your e-mail address and a password;</p>
              <p>2.1.3 Information provided in connection with orders you place;</p>
              <p>2.1.4 A record of any correspondence between you and us;</p>
              <p>2.1.5 Your replies to any surveys or questionnaires that we may use for research purposes;</p>
              <p>2.1.6 Details of accounting or financial transactions including transactions carried out through our website or otherwise (this may include information such as your credit card, debit card or bank account details);</p>
              <p>2.1.7 Details of your visits to our website and the resources that you access;</p>
              <p>2.1.8 Information we may require from you when you report a problem with our website.</p>
              <p>2.2 We only collect such information when you choose to supply it to us. You do not have to supply any personal information to us but you may not be able to take advantage of all the services we offer without doing so.</p>
              <p>2.3 Information is also gathered without you actively providing it, through the use of various technologies and methods such as Internet Protocol (IP) addresses and cookies. These methods do not collect or store personal information.</p>
              <p>2.4 An IP address is a number assigned to your computer by your Internet Service Provider (ISP), so you can access the Internet. It is generally considered to be non-personally identifiable information, because in most cases an IP address can only
                  be traced back to your ISP or the large company or organisation that provides your internet access (such as your employer if you are at work).</p>
              <p>2.5 We use your IP address to diagnose problems with our server, report aggregate information, and determine the fastest route for your computer to use in connecting to our site, and to administer and improve the site.</p>
              <p>3. Use and Disclosure</p>
              <p>3.1 We may use this information to:</p>
              <p>3.1.1 ensure that the content of our Site is presented in the most effective manner for you and for your computer and customise the Site to your preferences;
              </p>
              <p>3.1.2 assist in making general improvements to our Site;</p>
              <p>3.1.3 carry out and administer any obligations arising from any agreements entered into between you and us;</p>
              <p>3.1.4 allow you to participate in features of our Site and other services;</p>
              <p>3.1.5 contact you and notify you about changes to our Site or the services we offer (except where you have asked us not to do this);</p>
              <p>3.1.6 collect payments from you;</p>
              <p>3.1.7 analyse how users are making use of our Site and for internal marketing and research purposes.</p>
              <p>3.2 We do not disclose any information you provide via the Site to any third parties except:</p>
              <p>3.2.1 If we are under a duty to disclose or share your personal data in order to comply with any legal obligation (for example, if required to do so by a court order or for the purposes of prevention of fraud or other crime);</p>
              <p>3.2.2 in order to enforce any terms of use that apply to any of our Site, or to enforce any other terms and conditions or agreements for our services that may apply;</p>
              <p>3.2.3 to protect the rights, property, or safety of ourselves, our Site’s users, or any other third parties. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</p>
              <p>3.3 Other than as set out above, we shall not disclose any of your personal information unless you give us permission to do so.</p>
              <p>4. Cookies</p>
              <p>4.1 A cookie is a piece of data stored locally on your computer and contains information about your activities on the Internet. The information in a cookie does not contain any personally identifiable information you submit to our site.</p>
              <p>4.2 On our Site, we use cookies to track users&apos; progress through the Site, allowing us to make improvements based on usage data. We also use cookies if you log in to one of our online services to enable you to remain logged in to that service. A cookie
                  helps you get the best out of the Site and helps us to provide you with a more customised service.</p>
              <p>4.3 Once you close your browser, our access to the cookie terminates. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
                  To change your browse settings you should go to your advanced preferences.</p>
              <p>4.4 We are required to obtain your consent to use cookies. If you continue to use the Site having seen the notice then we assume you are happy for us to use the cookies described above.</p>
              <p>4.5 If you choose not to accept the cookies, this will not affect your access to the majority of information available on our Site. However, you will not be able to make full use of our online services.</p>
              <p>5. Web Statistics</p>
              <p>5.1 We use log files generated by our web servers to analyse site usage and statistics but the files do not identify any personal information. Log file analysis helps us to understand usage patterns on our website and to make improvements to our service.</p>
              <p>6. Access to and correction of personal information</p>
              <p>6.1 We will take all reasonable steps in accordance with our legal obligations to update or correct personally identifiable information in our possession that you submit via this Site.</p>
              <p>6.2 The Act gives you the right to access information held about you. Your right of access can be exercised in accordance with the Act. Any access request may be subject to a fee of £10 to meet our costs in providing you with details of the information
                  we hold about you. If you wish to see details of any personal information that we hold about you please contact us by way of our contact page.</p>
              <p>6.3 We take all appropriate steps to protect your personally identifiable information as you transmit your information from your computer to our Site and to protect such information for loss, misuse, and unauthorised access, disclosure, alteration,
                  or destruction. We use leading technologies and encryption software to safeguard your data, and operate strict security standards to prevent any unauthorised access to it.</p>
              <p>6.4 Where you use passwords, usernames, or other special access features on this site, you also have a responsibility to take reasonable steps to safeguard them.
              </p>
              <p>7. Other websites</p>
              <p>7.1 This Site contains links and references to other websites. Please be aware that this Privacy Policy does not apply to those websites.</p>
              <p>7.2 We cannot be responsible for the privacy policies and practices of sites that are not operated by us, even if you access them via the Site that is operated by us. We recommend that you check the policy of each site you visit and contact its owner
                  or operator if you have any concerns or questions.</p>
              <p>7.3 In addition, if you came to this Site via a third party site, we cannot be responsible for the privacy policies and practices of the owners or operators of that third party site and recommend that you check the policy of that third party site
                  and contact its owner or operator if you have any concerns or questions.</p>
              <p>8. Transferring your information outside of Europe</p>
              <p>8.1 As part of the services offered to you through our Site, the information you provide to us may be transferred to, and stored at, countries outside of the European Union (“EU”). By way of example, this may happen if any of our servers are from
                  time to time located in a country outside of the EU or one of our service providers is located in a country outside of the EU. We may also share information with other equivalent national bodies, which may be located in countries worldwide. These
                  countries may not have similar data protection laws to the UK. If we transfer your information outside of the EU in this way, we will take steps with the aim of ensuring that your privacy rights continue to be protected as outlined in this privacy
                  policy.</p>
              <p>8.2 If you use our Site while you are outside the EU, your information may be transferred outside the EU in order to provide you with those services.</p>
              <p>8.3 By submitting your personal information to us you agree to the transfer, storing or processing of your information outside the EU in the manner described above.</p>
              <p>9. Notification of changes to our Privacy Policy</p>
              <p>We will post details of any changes to our Privacy Policy on the Site to help ensure you are always aware of the information we collect, how we use it, and in what circumstances, if any, we share it with other parties.</p>
              <p>10. Contact us</p>
              <p>If at any time you would like to contact us with your views about our privacy practices, or with any enquiry relating to your personal information, you can do so by way of our contact page.</p>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default About
