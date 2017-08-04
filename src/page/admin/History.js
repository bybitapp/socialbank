import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { getHistory, getProjectsWithHistory, getOrganization } from '../../actions'
import { dateFormat } from '../../util/date'
import { isEmpty } from 'ramda'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import Select from '../../components/Select'

const selector = formValueSelector('history')

function mapStateToProps (state) {
  const { projects, history, organizations } = state
  let selectedProject = selector(state, 'project')
  return {
    projects,
    history,
    selectedProject,
    organizations
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'history'
  })
)

const historyLabel = {
  date: 'Date',
  type: 'Type',
  name: 'Name',
  currency: 'Currency',
  amount: 'Amount',
  status: 'Status',
  transaction: 'Transaction'
}

const HistoryItem = ({transaction}) => (
  <tr>
    <td data-label={historyLabel.date}>{ dateFormat(transaction.datetime) }</td>
    <td data-label={historyLabel.type}>{ transaction.type }</td>
    <td data-label={historyLabel.name}>{ transaction.name }</td>
    <td data-label={historyLabel.currency}>{ transaction.currency }</td>
    <td data-label={historyLabel.amount}>{ transaction.amount }</td>
    <td data-label={historyLabel.status}>{ transaction.status }</td>
    <td data-label={historyLabel.transaction}>{ transaction.transaction }</td>
  </tr>)

const HistoryTable = ({transactions = [], styleTable}) => (
  <table className='responsive-table' style={styleTable}>
    <thead>
      <tr>
        <th>{historyLabel.date}</th>
        <th>{historyLabel.type}</th>
        <th>{historyLabel.name}</th>
        <th>{historyLabel.currency}</th>
        <th>{historyLabel.amount}</th>
        <th>{historyLabel.status}</th>
        <th>{historyLabel.transaction}</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(transactions).map((key, index) => {
        const transaction = transactions[key]
        return (<HistoryItem key={key} transaction={transaction} />)
      })}
    </tbody>
  </table>)

class History extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getOrganization())
    dispatch(getProjectsWithHistory())
  }

  componentDidUpdate (prevProps) {
    const { selectedProject, dispatch } = this.props
    if (selectedProject !== prevProps.selectedProject) {
      dispatch(getHistory(selectedProject))
    }
  }

  render () {
    const styleTable = {padding: '16px', margin: '5px', borderLeft: 0, borderRight: 0}
    const stylePadding = {padding: '15px'}

    const { history, projects, organizations } = this.props

    const projectList = projects.map((item, index) => {
      return {
        id: item.id,
        name: item.name
      }
    })

    return (
      <div id='wrapper' className='clearfix'>
        <Header />
        <section id='content'>
          <main className='mdl-layout__content' style={{ width: '100%' }}>
            <div className='page-content'>
              <div className='mdl-grid'>
                <div className='mdl-cell mdl-cell--3-col mdl-cell--4-col-phone sb-menu-side-bar'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col'>
                  <div style={stylePadding}>
                    { organizations && organizations.isValid
                      ? (<div>
                        { isEmpty(projects)
                          ? <p className='sb-no-project'>No available projects</p>
                          : (
                            <div>
                              <div className='mdl-grid'>
                                <div className='mdl-cell mdl-cell--9-col'>
                                  <Field name='project' label='Project Name' component={Select} items={projectList} />
                                </div>
                                <div className='mdl-cell mdl-cell--3-col' />
                              </div>
                              <HistoryTable transactions={history} styleTable={styleTable} />
                            </div>
                          )
                        }
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

export default enhance(History)
