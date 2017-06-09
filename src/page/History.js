import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { getHistory } from '../actions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import Select from '../components/Select'

const selector = formValueSelector('history')

function mapStateToProps(state) {
  const { projects } = state
  let selectedProject = selector(state, 'project')
  if (!selectedProject) {
    if (projects && projects.length) {
      selectedProject = projects[0].id
    }
  }
  return {
    projects,
    selectedProject
  }
}


const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'history'
  })
)

class History extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeProject = this.onChangeProject.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedProject } = this.props
    if (selectedProject) {
      dispatch(getHistory(selectedProject))
    }
  }

  onChangeProject(e) {
    const { value } = e.target
    const { dispatch } = this.props
    dispatch(getHistory(value))
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleH3Right = {margin: 0, textAlign: 'right', paddingTop: '25px'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}

    const { projects, selectedProject } = this.props
    const project = projects.find(p => p.id === selectedProject)
    const balance = (project) ? project.balances.actual : 0
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
                        <MenuSideBar />
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div style={stylePadding}>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--9-col">
                                  <Field name="project" label="Project Name" component={Select} items={projectList}
                                    onChange={this.onChangeProject} />
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <h5 style={styleH3Right}>£{balance}</h5>
                                </div>
                            </div>
                            <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
                              <thead>
                                <tr>
                                  <th className="mdl-data-table__cell--non-numeric">Material</th>
                                  <th>Date</th>
                                  <th>Card Holder</th>
                                  <th>Unit price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$2.90</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$1.25</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$2.35</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Aga Gajownik</td>
                                  <td>$2.35</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Aga Gajownik</td>
                                  <td>$2.35</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$2.35</td>
                                </tr>
                              </tbody>
                            </table>
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

export default enhance(History)
