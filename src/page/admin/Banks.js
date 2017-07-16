import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import BankForm from '../../components/BankForm'
import BankRemoveForm from '../../components/BankRemoveForm'
import { getBankAccounts } from '../../actions'

function mapStateToProps (state) {
  const { banks } = state
  return {
    banks
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal')
)
const ActionButton = (pid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(pid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const BankItem = ({bank, actions}) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>{ bank.owner }</td>
    <td>{ bank.bankName }</td>
    <td>{ bank.ibanCode }</td>
    <td>{ bank.swiftCode }</td>
    <td className='sb-menu-table'>
      { actions.map((action) => ActionButton(bank.id, action)) }
    </td>
  </tr>)

const BankTable = ({banks = [], styleTable, actions}) => (
  <table className='mdl-data-table mdl-data-table--selectable' style={styleTable}>
    <thead>
      <tr>
        <th className='mdl-data-table__cell--non-numeric'>Owner</th>
        <th>Bank Name</th>
        <th>Iban Code</th>
        <th>Swift Code</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(banks).map((key, index) => {
        const b = banks[key]
        return (<BankItem key={key} bank={b} actions={actions} />)
      })}
    </tbody>
  </table>)

class Banks extends React.Component {
  constructor (props) {
    super(props)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getBankAccounts())
  }

  onRemove (bid, event) {
    const { banks, setModal, dispatch } = this.props
    const bank = banks.find((bank) => { return bank.id === bid })
    if (bank) {
      dispatch(change('bankRemoveForm', 'bid', bank.id))
      setModal('bankRemoveModal')
    }
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { banks, setModal, modal } = this.props
    const actions = [
      {icon: 'mode_edit', onclick: this.onEdit},
      {icon: 'delete', onclick: this.onRemove}
    ]

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header />
        <MobileNavigation />
        <BankForm open={(modal === 'bankModal')} handleClose={() => setModal(null)} />
        <BankRemoveForm open={(modal === 'bankRemoveModal')} handleClose={() => setModal(null)} />
        <main className='mdl-layout__content'>
          <div className='page-content'>
            <div className='mdl-grid'>
              <div className='mdl-cell mdl-cell--3-col'>
                <MenuSideBar />
              </div>
              <div className='mdl-cell mdl-cell--9-col' style={styleBorderLeft}>
                <div style={stylePadding}>
                  <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                    <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                      onClick={() => setModal('bankModal')}>
                        Add Bank
                    </button>
                  </div>
                  <BankTable banks={banks} styleTable={styleTable} actions={actions} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

export default enhance(Banks)
