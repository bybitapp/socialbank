import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, change } from 'redux-form'
import { getOrganizationCards, getProjects, getUsers, getCardDetail } from '../../actions'
import { toastr } from 'react-redux-toastr'
import { CARD_STATUS } from '../../constants/Option'
import Auth from '../../modules/Auth'
import CardForm from '../../components/CardForm'
import CardDestroyForm from '../../components/CardDestroyForm'
import CardTransferForm from '../../components/CardTransferForm'
import CardBlockForm from '../../components/CardBlockForm'
import CardUnblockForm from '../../components/CardUnblockForm'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'

function mapStateToProps (state) {
  const { cards, projects, users, modal } = state
  return {
    cards,
    projects,
    users,
    modal
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal'),
  reduxForm({
    form: 'cards'
  })
)

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

const ActionButton = (cid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(cid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const CardDetail = ({cardDetail}) => {
  console.log(cardDetail)
  return (
    <tr>
      <td colSpan='8'>
        { cardDetail.cardName
          ? <div className='sb-card container clearfix'>
            <div className='row'>
              <div className='sb-card-name col-sm-8'>{ cardDetail.cardName }</div>
              <div className='sb-card-brand col-sm-4'><i className='pf pf-stripe' /></div>
            </div>
            <div className='row bottommargin-sm'>
              <div className='sb-card-number'>{ formatCardNnumber(cardDetail.cardNumber) }</div>
            </div>
            <div className='row'>
              <div className='col-sm-8'>
                <div className='sb-card-startdate'><label>CREATED AT</label> { cardDetail.startDate }</div>
                <div className='sb-card-enddate'><label>VALID THRU</label> { cardDetail.endDate }</div>
              </div>
              <div className='sb-card-cvv col-sm-4'><label>CVV</label>{ cardDetail.cvv }</div>
            </div>
          </div>
          : <div style={preloaderStyle}>
            <div >
              <span className='dark preloader' style={loaderStyle} />
            </div>
            <span>Loading...</span>
          </div>
        }
      </td>
    </tr>
  )
}

const CardItem = ({card, actions, projects = [], users = []}) => {
  const cardStatus = CARD_STATUS.find((status) => (status.id === card.status))
  const cardStatusName = cardStatus ? cardStatus.name : 'unknown'
  const project = projects.find(p => p.id === card.projectId)
  const user = users.find(u => u.id === card.userId)
  const projectName = (project && project.name) || 'unknown'
  const userName = (user && user.profile && user.profile.name) || 'unknown'
  const userEmail = (user && user.email) || 'unknown'
  return (
    <tr>
      <td className='mdl-data-table__cell--non-numeric'>{ projectName }</td>
      <td>{ userName }</td>
      <td>{ userEmail }</td>
      <td>{ card.cardNumber }</td>
      <td>{ card.endDate }</td>
      <td>{ cardStatusName }</td>
      <td>{ card.balances.actual }</td>
      <td className='sb-menu-table'>
        { actions.map((action) => {
          if (!action.hasOwnProperty('show') || action.show(card)) {
            return ActionButton(card.id, action)
          }
          return null
        })
        }
      </td>
    </tr>
  )
}

const CardTable = ({cards = [], projects = [], users = [], cardDetail, styleTable, actions}) => (
  <table className='mdl-data-table mdl-data-table--selectable' style={styleTable}>
    <thead>
      <tr>
        <th className='mdl-data-table__cell--non-numeric'>Project</th>
        <th>Name</th>
        <th>Email</th>
        <th>Card Number</th>
        <th>End</th>
        <th>Status</th>
        <th>Balance</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(cards).map((key, index) => {
        const c = cards[key]
        if (cardDetail && cardDetail.id === c.id) {
          return ([
            <CardItem key={key} card={c} actions={actions} projects={projects} users={users} />,
            <CardDetail cardDetail={cardDetail} />
          ])
        } else {
          return (<CardItem key={key} card={c} actions={actions} projects={projects} users={users} />)
        }
      })}
    </tbody>
  </table>)

class Cards extends React.Component {
  constructor (props) {
    super(props)
    this.state = { cardDetail: null }
    this.onDestroy = this.onDestroy.bind(this)
    this.onTransfer = this.onTransfer.bind(this)
    this.onBlock = this.onBlock.bind(this)
    this.onUnblock = this.onUnblock.bind(this)
    this.onSelectDetail = this.onSelectDetail.bind(this)
    this.onCloseDetail = this.onCloseDetail.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getProjects())
    dispatch(getUsers())
    dispatch(getOrganizationCards())
  }

  onDestroy (cid, event) {
    const { cards, setModal, dispatch } = this.props
    const card = cards.find((card) => { return card.id === cid })
    if (card) {
      dispatch(change('cardDestroyForm', 'cid', card.id))
      setModal('cardDestroyModal')
    }
  }

  onTransfer (cid, event) {
    const { projects, cards, users, setModal, dispatch } = this.props
    const card = cards.find((c) => c.id === cid)
    const project = projects.find((p) => p.id === card.projectId)
    const user = users.find((u) => u.id === card.userId)
    if (card && project && user) {
      dispatch(change('cardTransferForm', 'pid', project.id))
      dispatch(change('cardTransferForm', 'cid', card.id))
      dispatch(change('cardTransferForm', 'projectName', project.name))
      dispatch(change('cardTransferForm', 'userEmail', user.email))
      setModal('cardTransferModal')
    }
  }

  onBlock (cid, event) {
    const { cards, setModal, dispatch } = this.props
    const card = cards.find((card) => { return card.id === cid })
    if (card) {
      dispatch(change('cardBlockForm', 'cid', card.id))
      setModal('cardBlockModal')
    }
  }

  onUnblock (cid, event) {
    const { cards, setModal, dispatch } = this.props
    const card = cards.find((card) => { return card.id === cid })
    if (card) {
      dispatch(change('cardUnblockForm', 'cid', card.id))
      setModal('cardUnblockModal')
    }
  }

  onSelectDetail (cid, event) {
    if (this.state.cardDetail && cid === this.state.cardDetail.id) {
      this.setState({ cardDetail: null })
    } else {
      const { cards, dispatch } = this.props
      const card = cards.find((card) => { return card.id === cid })
      if (card) {
        this.setState({ cardDetail: {id: cid} })
        dispatch(getCardDetail({cid}, (_error, data) => {
          if (!_error) {
            if (this.state.cardDetail.id === data.id) {
              this.setState({ cardDetail: data })
            }
          } else {
            toastr.error('Aw snap!', _error)
          }
        }))
      }
    }
  }

  onCloseDetail (event) {
    this.setState({ cardDetail: null })
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0, overflow: 'auto'}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { cards, projects, users, modal, setModal } = this.props

    const actions = [
      {icon: 'attach_money', onclick: this.onTransfer},
      {icon: 'lock', onclick: this.onBlock, show: (item) => item.status === 'active'},
      {icon: 'lock_open', onclick: this.onUnblock, show: (item) => item.status === 'inactive'},
      {icon: 'delete', onclick: this.onDestroy},
      {
        icon: 'credit_card',
        onclick: this.onSelectDetail,
        show: (item) => {
          const user = Auth.getUser()
          if (user.access === 'USER') {
            return item.userId === user.id
          }
          return true
        }
      }
    ]

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <CardForm open={(modal === 'cardModal')} handleClose={() => setModal(null)} />
        <CardDestroyForm open={(modal === 'cardDestroyModal')} handleClose={() => setModal(null)} />
        <CardTransferForm open={(modal === 'cardTransferModal')} handleClose={() => setModal(null)} />
        <CardBlockForm open={(modal === 'cardBlockModal')} handleClose={() => setModal(null)} />
        <CardUnblockForm open={(modal === 'cardUnblockModal')} handleClose={() => setModal(null)} />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col' style={styleBorderLeft}>
                  <div style={stylePadding}>
                    <div className='mdl-grid'>
                      <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                        <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                          onClick={() => setModal('cardModal')}>
                            Add Card
                        </button>
                      </div>
                    </div>
                    <CardTable cards={cards} styleTable={styleTable} actions={actions}
                      projects={projects} users={users} cardDetail={this.state.cardDetail} />
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

export default enhance(Cards)
