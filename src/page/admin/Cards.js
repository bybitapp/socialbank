import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, change } from 'redux-form'
import { getOrganizationCards, getProjects, getUsers, getCardDetail, getOrganization } from '../../actions'
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
import DebitCard from '../../components/DebitCard'

function mapStateToProps (state) {
  const { cards, projects, users, userOrg, modal } = state
  return {
    cards,
    projects,
    users,
    userOrg,
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

const cardLabel = {
  projectName: 'Project',
  userName: 'Name',
  userEmail: 'Email',
  cardNumber: 'Card Number',
  endDate: 'End',
  cardStatus: 'Status',
  balance: 'Balance',
  actions: 'Actions'
}

const preloaderStyle = {margin: 'auto', textAlign: 'center', display: 'block'}
const loaderStyle = {widht: '28px', height: '28px'}

const ActionButton = (cid, action) => (
  <a key={action.icon} className='mdl-list__item-primary-content' onClick={(event) => action.onclick(cid, event)}>
    <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{action.icon}</i>
  </a>
)

const PreLoader = () => {
  return (
    <div style={preloaderStyle}>
      <div >
        <span className='dark preloader' style={loaderStyle} />
      </div>
      <span>Loading...</span>
    </div>
  )
}

const CardDetail = ({cardDetail}) => {
  return (
    <tr>
      <td colSpan='8' className='sb-card-detail'>
        { cardDetail.cardName
          ? <DebitCard cardDetail={cardDetail} />
          : <PreLoader />
        }
      </td>
    </tr>
  )
}

const CardItem = ({card, actions, projects = [], users = []}) => {
  const cardStatus = CARD_STATUS.find((status) => (status.id === card.status))
  const cardStatusName = cardStatus ? cardStatus.name : 'unknown'
  const project = projects.find(p => p.id === card.projectId)
  const user = Auth.getUser().id === card.userId ? Auth.getUser() : users.find(u => u.id === card.userId)
  const projectName = (project && project.name) || 'unknown'
  const userName = (user && user.profile && user.profile.name) || 'unknown'
  const userEmail = (user && user.email) || 'unknown'
  return (
    <tr>
      <td data-label={cardLabel.projectName}>{ projectName }</td>
      <td data-label={cardLabel.userName}>{ userName }</td>
      <td data-label={cardLabel.userEmail}>{ userEmail }</td>
      <td data-label={cardLabel.cardNumber}>{ card.cardNumber }</td>
      <td data-label={cardLabel.endDate}>{ card.endDate }</td>
      <td data-label={cardLabel.cardStatus}>{ cardStatusName }</td>
      <td data-label={cardLabel.balance}>{ card.balances.actual }</td>
      <td data-label={cardLabel.actions} className='sb-menu-table'>
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

const CardTable = ({cards = [], projects = [], users = [], cardDetail, styleTable, actions}) => {
  return (
    <table className='responsive-table' style={styleTable}>
      <thead>
        <tr>
          <th>{cardLabel.projectName}</th>
          <th>{cardLabel.userName}</th>
          <th>{cardLabel.userEmail}</th>
          <th>{cardLabel.cardNumber}</th>
          <th>{cardLabel.endDate}</th>
          <th>{cardLabel.cardStatus}</th>
          <th>{cardLabel.balance}</th>
          <th>{cardLabel.actions}</th>
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
}

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
    dispatch(getOrganization())
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
    const styleTable = {padding: '16px', margin: '5px', borderLeft: 0, borderRight: 0}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}
    const stylePadding = {padding: '15px'}

    const { cards, projects, users, userOrg, modal, setModal } = this.props

    let actions = [
      {icon: 'attach_money', onclick: this.onTransfer, access: 'owner,admin'},
      {icon: 'lock', onclick: this.onBlock, show: (item) => item.status === 'active', access: 'owner,admin,user'},
      {icon: 'lock_open', onclick: this.onUnblock, show: (item) => item.status === 'inactive', access: 'owner,admin,user'},
      {icon: 'delete', onclick: this.onDestroy, access: 'owner,admin'},
      {
        icon: 'credit_card',
        onclick: this.onSelectDetail,
        show: (item) => item.userId === Auth.getUser().id,
        access: 'owner,admin,user'
      }
    ]
    actions = actions.filter((i) => i.access.indexOf(Auth.getUser().access) !== -1)

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
                <div className='mdl-cell mdl-cell--3-col mdl-cell--4-col-phone sb-menu-side-bar'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col'>
                  <div style={stylePadding}>
                    { userOrg && userOrg.isValid
                      ? (<div>
                        <div className='mdl-grid'>
                          <div className='mdl-cell mdl-cell--12-col' style={styleButton}>
                            <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
                              onClick={() => setModal('cardModal')}>
                                Add Card
                            </button>
                          </div>
                        </div>
                        <CardTable cards={cards} styleTable={styleTable} actions={actions} projects={projects} users={users} cardDetail={this.state.cardDetail} />
                      </div>
                      )
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

export default enhance(Cards)
