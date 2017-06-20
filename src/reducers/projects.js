import {
  RECEIVE_PROJECTS, ADD_PROJECT_SUCCESS, SELECT_CURRENT_PROJECT,
  CLOSE_PROJECT_SUCCESS, UPDATE_PROJECT_SUCCESS, DEPOSIT_PROJECT_SUCCESS,
  LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_SESSION_TEMP
} from '../constants/ActionTypes'

import Auth from '../modules/Auth'

export const projects = (state = [], action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return (action.data.projects) ? action.data.projects : state
    case LOGOUT_SUCCESS:
      return state
    case LOGIN_SESSION_TEMP:
      return (action.data.projects) ? action.data.projects : state
    case RECEIVE_PROJECTS:
      return (action.projects) ? action.projects : state
    case ADD_PROJECT_SUCCESS:
      const added = state.concat(action.data)

      // TODO temporary fix
      let user1 = Auth.getUser()
      user1.projects = added
      Auth.authenticateUser(user1)

      return added
    case UPDATE_PROJECT_SUCCESS:
      const updated = state.map(item => {
        if (item.id === action.data.id) {
          item.name = action.data.name
          item.description = action.data.description
          item.access = action.data.access
        }
        return item
      })

      // TODO temporary fix
      let user2 = Auth.getUser()
      user2.projects = updated
      Auth.authenticateUser(user2)

      return updated
    case CLOSE_PROJECT_SUCCESS:
      const deleted = state.filter(item => item.id !== action.projectId)

      // TODO temporary fix
      let user3 = Auth.getUser()
      user3.projects = deleted
      Auth.authenticateUser(user3)

      return deleted
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
