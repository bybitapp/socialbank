import { REGISTER_ACCOUNT_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/ActionTypes'

export const account = (state = [], action) => {
  switch (action.type) {
    case REGISTER_ACCOUNT_SUCCESS:
      return (action.account) ? action.account : state
    case LOGIN_SUCCESS:
      return (action.data.account) ? action.data.account : state
    case LOGOUT_SUCCESS:
      return state
    default:
      return state
  }
}
