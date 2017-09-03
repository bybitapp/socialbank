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
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Faq
