import React from 'react'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProjects } from '../actions'
import { dateFormat } from '../util/date'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'
import ProjectForm from '../components/ProjectForm'

function mapStateToProps(state) {
  const { projects } = state
  return {
    projects
  }
}

const enhance = compose(
  connect(mapStateToProps),
  withState('modal', 'setModal')
)

const ProjectItem = ({project}) => (
    <tr>
      <td className="mdl-data-table__cell--non-numeric">{ project.name }</td>
      <td>{ dateFormat(project.created) }</td>
      <td>{ project.balance.actual }</td>
      <td>{ project.cards }</td>
      <td className="sb-menu-table">
          <Link className="mdl-list__item-primary-content" to={ '/projects/1' }>
            <i className="material-icons mdl-list__item-avatar sb-icon-list_item">attach_money</i>
          </Link>
          <Link className="mdl-list__item-primary-content" to={ '/projects/1' }>
            <i className="material-icons mdl-list__item-avatar sb-icon-list_item">mode_edit</i>
          </Link>
          <Link className="mdl-list__item-primary-content" to={ '/projects/delete/1' }>
            <i className="material-icons mdl-list__item-avatar sb-icon-list_item">delete</i>
          </Link>
      </td>
    </tr>)

const ProjectTable = ({projects = [], styleTable}) => (
    <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
      <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">Name</th>
          <th>Date Created</th>
          <th>Budget</th>
          <th>Virtual Cards</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      { Object.keys(projects).map((key, index) => {
        const p = projects[key]
        return (<ProjectItem key={key} project={p}/>)
      })}
      </tbody>
    </table>)

class Projects extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getProjects())
  }

  componentDidUpdate(prevProps) {
    if (this.props.projects !== prevProps.projects) {
      const { dispatch } = this.props
      dispatch(getProjects())
    }
  }

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}
    const styleButton = {textAlign: 'right', paddingTop: '10px'}

    const { projects, modal, setModal } = this.props

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <ProjectForm open={(modal === 'projectModal')} handleClose={() => setModal(null)} />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <MenuSideBar />
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div style={stylePadding}>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--12-col" style={styleButton}>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => setModal('projectModal')}>
                                        Add Project
                                    </button>
                                </div>
                            </div>
                            <ProjectTable projects={projects} styleTable={styleTable} />
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

export default enhance(Projects)
