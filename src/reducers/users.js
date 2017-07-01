import { RECEIVE_USERS } from '../constants/ActionTypes'

export const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return (action.data.users) ? action.data.users : state
    default:
      return state
  }
}
