import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import BankForm from '../../components/BankForm'
import BankRemoveForm from '../../components/BankRemoveForm'
import { getBankAccounts, getOrganization } from '../../actions'

function mapStateToProps (state) {
  const { banks, userOrganization } = state
  return {
    banks,
    userOrganization
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal')
)

const bankLabel = {
  owner: 'Owner',
  bankName: 'Bank Name',
  ibanCode: 'Iban Code',
  swiftCode: 'Swift Code',
  actions: 'Actions'
}

const ActionButton = (pid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(pid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const BankItem = ({bank, actions}) => (
  <tr>
    <td data-label={bankLabel.owner}>{ bank.owner }</td>
    <td data-label={bankLabel.bankName}>{ bank.bankName }</td>
    <td data-label={bankLabel.ibanCode}>{ bank.ibanCode }</td>
    <td data-label={bankLabel.swiftCode}>{ bank.swiftCode }</td>
    <td data-label={bankLabel.actions} className='sb-menu-table'>
      { actions.map((action) => ActionButton(bank.id, action)) }
    </td>
  </tr>)

const BankTable = ({banks = [], styleTable, actions}) => (
  <table className='responsive-table' style={styleTable}>
    <thead>
      <tr>
        <th>{bankLabel.owner}</th>
        <th>{bankLabel.bankName}</th>
        <th>{bankLabel.ibanCode}</th>
        <th>{bankLabel.swiftCode}</th>
        <th>{bankLabel.actions}</th>
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
    dispatch(getOrganization())
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
    const styleTable = {padding: '16px', margin: '5px', borderLeft: 0, borderRight: 0}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}
    const stylePadding = {padding: '15px'}

    const { banks, userOrganization, setModal, modal } = this.props
    const actions = [
      {icon: 'mode_edit', onclick: this.onEdit},
      {icon: 'delete', onclick: this.onRemove}
    ]

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <BankForm open={(modal === 'bankModal')} handleClose={() => setModal(null)} />
        <BankRemoveForm open={(modal === 'bankRemoveModal')} handleClose={() => setModal(null)} />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col mdl-cell--4-col-phone sb-menu-side-bar'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col'>
                  <div style={stylePadding}>
                    { userOrganization && userOrganization.isValid
                      ? (<div>
                        <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                          <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                            onClick={() => setModal('bankModal')}>
                              Add Bank
                          </button>
                        </div>
                        <BankTable banks={banks} styleTable={styleTable} actions={actions} />
                      </div>)
                      : <p>Your organization is in the verification process. Please contact with the administration to get more information about progress.</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <Footer />
      </div>
    )
  }
}

export default enhance(Banks)
