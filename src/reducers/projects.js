import { RECEIVE_PROJECTS, ADD_PROJECT_SUCCESS, SELECT_CURRENT_PROJECT, LOGIN_SUCCESS } from '../constants/ActionTypes'
import { CLOSE_PROJECT_SUCCESS } from '../constants/ActionTypes'

export const projects = (state = [], action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return (action.data.projects) ? action.data.projects : state
    case RECEIVE_PROJECTS:
      return (action.projects) ? action.projects : state
    case ADD_PROJECT_SUCCESS:
      return state.concat(action.project)
    case CLOSE_PROJECT_SUCCESS:
      return state.filter(item => item.id !== action.project.id)
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
