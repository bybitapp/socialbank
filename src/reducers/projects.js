import { RECEIVE_PROJECTS, ADD_PROJECT_SUCCESS, SELECT_CURRENT_PROJECT } from '../constants/ActionTypes'

export const projects = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return (action.projects) ? action.projects : state
    case ADD_PROJECT_SUCCESS:
      return state.concat(action.project)
    case SELECT_CURRENT_PROJECT:
      return state.map((project) => {
          if (project.id === action.id) {
              project['selected'] = true
          } else {
              project['selected'] = false
          }
          return project
      })
    default:
      return state
  }
}
