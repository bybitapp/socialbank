import { RECEIVE_USERS_SUCCESS, REMOVE_USER_SUCCESS, ADD_USER_SUCCESS, UPDATE_USER_SUCCESS } from '../constants/ActionTypes'

export const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS_SUCCESS:
      return (action.data) ? action.data : state
    case ADD_USER_SUCCESS:
      return state.concat(action.data)
    case UPDATE_USER_SUCCESS:
      return state.map(item => {
        if (item.id === action.data.id) {
          item.access = action.data.access
          item.profile = action.data.profile
        }
        return item
      })
    case REMOVE_USER_SUCCESS:
      return state.filter(item => {
        return item.id !== action.data.id
      })
    default:
      return state
  }
}
