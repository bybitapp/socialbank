import { REGISTER_ACCOUNT_SUCCESS, LOGIN_SUCCESS } from '../constants/ActionTypes'

export const account = (state = [], action) => {
  switch (action.type) {
    case REGISTER_ACCOUNT_SUCCESS:
    case LOGIN_SUCCESS:
      return (action.account) ? action.account : state
    default:
      return state
  }
}
