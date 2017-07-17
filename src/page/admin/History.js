import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { getHistory, getProjectsWithHistory } from '../../actions'
import { dateFormat } from '../../util/date'
import { isEmpty } from 'ramda'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MenuSideBar from '../../components/MenuSideBar'
import Select from '../../components/Select'

const selector = formValueSelector('history')

function mapStateToProps (state) {
  const { projects, history } = state
  let selectedProject = selector(state, 'project')
  return {
    projects,
    history,
    selectedProject
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'history'
  })
)

const HistoryItem = ({transaction}) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>{ dateFormat(transaction.datetime) }</td>
    <td>{ transaction.type }</td>
    <td>{ transaction.name }</td>
    <td>{ transaction.currency }</td>
    <td>{ transaction.amount }</td>
    <td>{ transaction.status }</td>
    <td>{ transaction.transaction }</td>
  </tr>)

const HistoryTable = ({transactions = [], styleTable}) => (
  <table className='mdl-data-table mdl-data-table--selectable' style={styleTable}>
    <thead>
      <tr>
        <th className='mdl-data-table__cell--non-numeric'>Date</th>
        <th>Type</th>
        <th>Name</th>
        <th>Currency</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Transaction</th>
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
    dispatch(getProjectsWithHistory())
  }

  componentDidUpdate (prevProps) {
    const { selectedProject, dispatch } = this.props
    if (selectedProject !== prevProps.selectedProject) {
      dispatch(getHistory(selectedProject))
    }
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}

    const { history, projects } = this.props

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
                <div className='mdl-cell mdl-cell--3-col'>
                  <MenuSideBar />
                </div>
                <div className='mdl-cell mdl-cell--9-col' style={styleBorderLeft}>
                  <div style={stylePadding}>
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
