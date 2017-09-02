
import React from 'react'

const cardBrandClass = {
  'NO_CARD_BRAND': 'pf-credit-card',
  'AMEX': 'pf-american-express',
  'CHINAUNIONPAY': 'pf-unionpay',
  'DINERS': 'pf-diners',
  'DISCOVER': 'pf-discover',
  'JCB': 'pf-jcb',
  'MASTERCARD': 'pf-mastercard-alt',
  'MAESTRO': 'pf-maestro-alt',
  'SOLO': 'pf-credit-card',
  'VISA': 'pf-visa',
  'VISADEBIT': 'pf-visa-debit',
  'VISAELECTRON': 'pf-visa-electron',
  'VISAPURCHASING': 'pf-credit-card',
  'VERVE': 'pf-credit-card'
}

const FormatCardNnumber = ({cardNumber}) => {
  const cardNumberArray = cardNumber.match(/.{1,4}/g)
  return (
    <div>
      {Object.keys(cardNumberArray).map((key, index) => {
        const num = cardNumberArray[key]
        return (<span key={key} className={'num-' + key}>{num}</span>)
      })}
    </div>
  )
}

export default ({cardDetail}) => (
  <div style={{display: 'inline-table'}}>
    <div className='card'>
      <div className='front'>
        <div className='top'>
          <div className='title'>
            <span className='type'>Visa Virtual Account</span>
            <span className='desc'>Internet and Telephone use only</span>
          </div>
          <div className='logo' />
        </div>
        <div className='middle'>
          <div className='cd-number'>
            <FormatCardNnumber cardNumber={cardDetail.cardNumber} />
          </div>
        </div>
        <div className='bottom'>
          <div className='expires'>
            <div className='data'>
              <span className='text'>VALID FROM:</span>
              <span className='value'>{ cardDetail.startDate }</span>
            </div>
            <div className='data'>
              <span className='text'>EXPIRES END</span>
              <span className='value'>{ cardDetail.endDate }</span>
            </div>
            <div className='ixaris'>
              { cardDetail.cardName }
            </div>
          </div>
          <div className='cardtype'>
            <div className='logo'><i className={`pf ${cardBrandClass[cardDetail.cardBrand]}`} /></div>
            <div className='type'>Prepaid</div>
          </div>
        </div>
      </div>
    </div>

    <div className='card'>
      <div className='back'>
        <div className='top'>
          <div className='company-link'>Ixaris.com</div>
          <div className='magstripe'>Internet and Telephone use only</div>
        </div>
        <div className='middle'>
          <div className='cvc'>CCV2: { cardDetail.cvv }</div>
        </div>
        <div className='bottom'>
          <div className='issue'>
            This card is issued by IDT Financial Services Limited (IDTFS) pursuant to a license from Visa Europe and remains the property of IDT Financial Services Ltd.
          </div>
          <div className='type'>
            Prepaid
          </div>
        </div>
      </div>
    </div>
  </div>
)
