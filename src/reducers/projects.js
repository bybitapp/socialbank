import {
  RECEIVE_PROJECTS_SUCCESS, ADD_PROJECT_SUCCESS, SELECT_CURRENT_PROJECT,
  CLOSE_PROJECT_SUCCESS, UPDATE_PROJECT_SUCCESS, DEPOSIT_PROJECT_SUCCESS,
  LOGOUT_SUCCESS
} from '../constants/ActionTypes'

export const projects = (state = [], action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return state
    case RECEIVE_PROJECTS_SUCCESS:
      return (action.data.projects) ? action.data.projects : state
    case ADD_PROJECT_SUCCESS:
      return state.concat(action.data)
    case UPDATE_PROJECT_SUCCESS:
      return state.map(item => {
        if (item.id === action.data.id) {
          item.name = action.data.name
          item.description = action.data.description
          item.access = action.data.access
        }
        return item
      })
    case CLOSE_PROJECT_SUCCESS:
      return state.filter(item => item.id !== action.projectId)
    case DEPOSIT_PROJECT_SUCCESS:
      return state.map(item => {
        if (item.id === action.data.projectId) {
          item.balances.actual += action.data.amount
        }
        return item
      })
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
