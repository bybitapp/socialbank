import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', padding: '5px', transform: 'translate(-50%, -50%)'},
  overlay: {zIndex: 4}
}

const preloaderStyle = {margin: 'auto', textAlign: 'center', display: 'block'}
const loaderStyle = {widht: '28px', height: '28px'}

const formatCardNnumber = (cardNumber) => {
  const cardNumberArray = cardNumber.match(/.{1,4}/g)
  console.log(cardNumberArray)
  let formattedCardNumber = ''
  cardNumberArray.forEach((num) => {
    formattedCardNumber += num + '\t'
  })
  return formattedCardNumber
}

class CardDetailForm extends React.Component {
  onClose () {
    const { handleClose } = this.props
    handleClose()
  }

  render () {
    const { handleClose, open, cardDetail } = this.props
    console.log('render CardDetailForm')
    console.log(cardDetail)
    return (
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel='Card Detail'
      >
        <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header sb-modal-form'>
          <header className='mdl-layout__header'>
            <div className='mdl-layout__header-row'>
              <span className='mdl-layout-title'>Card Detail</span>
              <div className='mdl-layout-spacer' />
            </div>
          </header>
          <main className='mdl-layout__content'>
            <div className='page-content'>
              <div className='sb-card'>
                { cardDetail
                  ? <div>
                    <div className='sb-card-name'>{ cardDetail.cardName }</div>
                    <div className='sb-card-number'>{ formatCardNnumber(cardDetail.cardNumber) }</div>
                    <div className='sb-card-cvv'>{ cardDetail.cvv }</div>
                    <div className='sb-card-startdate'>CREATED AT { cardDetail.startDate }</div>
                    <div className='sb-card-enddate'>EXPIRES { cardDetail.endDate }</div>
                    <div className='sb-card-brand'><img src={`images/credit_card/brands/${cardDetail.cardBrand}.png`} alt={cardDetail.cardBrand} /></div>
                  </div>
                  : <div style={preloaderStyle}>
                    <div >
                      <span className='dark preloader' style={loaderStyle} />
                    </div>
                    <span>Loading...</span>
                  </div>
                }
              </div>
            </div>
          </main>
          <footer className='sb-footer'>
            <div className='mdl-mega-footer__bottom-section'>
              <ul className='mdl-mega-footer__link-list'>
                <li><button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this.onClose.bind(this)}>Close</button></li>
              </ul>
            </div>
          </footer>
        </div>
      </Modal>
    )
  }
}

export default CardDetailForm
