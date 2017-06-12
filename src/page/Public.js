import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { getHistory, getOrganizationById } from '../actions'
import { dateFormat } from '../util/date'
import { isEmpty } from 'ramda'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Select from '../components/Select'

const selector = formValueSelector('public')

function mapStateToProps(state) {
  const { organizations, history } = state
  const projects = organizations.projects || []
  let selectedProject = selector(state, 'project')
  if (!selectedProject) {
    if (projects && projects.length) {
      selectedProject = projects[0].id
    }
  }
  return {
    organizations,
    projects,
    history,
    selectedProject
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'public'
  })
)

const PublicItem = ({transaction}) => (
    <tr>
      <td className="mdl-data-table__cell--non-numeric">{ dateFormat(transaction.datetime) }</td>
      <td>{ transaction.name}</td>
      <td>{ transaction.currency }</td>
      <td>{ transaction.amount }</td>
      <td>{ transaction.status }</td>
      <td>{ transaction.type }</td>
    </tr>)

const PublicTable = ({transactions = [], styleTable}) => (
    <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
      <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">Date</th>
          <th>Name</th>
          <th>Currency</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
      { Object.keys(transactions).map((key, index) => {
        const transaction = transactions[key]
        return (<PublicItem key={key} transaction={transaction} />)
      })}
      </tbody>
    </table>)

class Public extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeProject = this.onChangeProject.bind(this)
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    if (match.params.id) {
      dispatch(getOrganizationById(match.params.id))
    }
  }

  onChangeProject(e) {
    const { value } = e.target
    const { dispatch } = this.props
    dispatch(getHistory(value))
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}

    const { history, organizations, projects } = this.props

    const projectList = projects.map((item, index) => {
      return {
        id: item.id,
        name: item.name
      }
    })

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                      <h5>Organization</h5>
                      <div style={stylePadding}>
                        Name: {organizations.name} <br/>
                        Number: {organizations.number} <br/>
                      </div>
                      <h5>Location</h5>
                      <div style={stylePadding}>
                        Address: {organizations.address} <br/>
                        Postcode: {organizations.postcode} <br/>
                        City: {organizations.city} <br/>
                      </div>
                      <h5>Other</h5>
                      <div style={stylePadding}>
                        Funds: {organizations.funds} <br/>
                      </div>
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div style={stylePadding}>
                          { isEmpty(projects) ?
                            <p className="sb-no-project">No available projects</p> :
                            (
                              <div>
                                <div className="mdl-grid">
                                  <div className="mdl-cell mdl-cell--9-col">
                                    <Field name="project" label="Project Name" component={Select} items={projectList}
                                      onChange={this.onChangeProject} />
                                  </div>
                                  <div className="mdl-cell mdl-cell--3-col">
                                  </div>
                                </div>
                                <PublicTable transactions={history} styleTable={styleTable} />
                              </div>
                            )
                          }
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

export default enhance(Public)
