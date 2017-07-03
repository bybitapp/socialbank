import { RECEIVE_USERS, REMOVE_USER } from '../constants/ActionTypes'

export const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return (action.data) ? action.data : state
    case REMOVE_USER:
      return state.filter(item => {
        return item.id !== action.data.id
      })
    default:
      return state
  }
}
