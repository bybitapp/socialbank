import React from 'react'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import { isEmpty } from 'ramda'
import AddProjectForm from './AddProjectForm'
import { selectCurrentProject } from '../actions'
import { Link } from 'react-router-dom'

const enhance = compose(
  connect(state => ({ projects: state.projects }), {selectCurrentProject}),
  withState('modal', 'setModal')
)

const ProjectItemSideBar = ({p, onClick}) => (
    <Link to={`/p/${p.id}`}>
        <li className="mdl-list__item mdl-list__item--two-line" onClick={onClick}>
          <span className="mdl-list__item-primary-content" >
            <i className="material-icons mdl-list__item-avatar">{ p.icon }</i>
            <span>{ p.name }</span>
            <span className="mdl-list__item-sub-title">Funds: { p.funds }</span>
          </span>
        </li>
    </Link>)

const ProjectListSideBar = ({ projects, select }) => (
    <ul className="mdl-list">
    { Object.keys(projects).map((key, index) => {
        const p = projects[key]
        return (<ProjectItemSideBar
                    key={p.id}
                    p={p}/>)
    })}
    </ul>)

class ProjectSideBar extends React.Component {

  render() {
    const {projects = {}, modal, setModal, selectCurrentProject } = this.props

    return (
    <div>
        { isEmpty(projects) ?
            <p className="sb-no-project">No project yet</p> :
            <ProjectListSideBar projects={projects} select={selectCurrentProject} /> }
    </div>
    );
  }
}

export default enhance(ProjectSideBar)
