import { RECEIVE_USERS, REMOVE_USER, ADD_USER, UPDATE_USER } from '../constants/ActionTypes'

export const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return (action.data) ? action.data : state
    case ADD_USER:
      return state.concat(action.data)
    case UPDATE_USER:
      return state.map(item => {
        if (item.id === action.data.id) {
          item.access = action.data.access
        }
        return item
      })
    case REMOVE_USER:
      return state.filter(item => {
        return item.id !== action.data.id
      })
    default:
      return state
  }
}
