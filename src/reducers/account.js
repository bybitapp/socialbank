import { REGISTER_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/ActionTypes'

export const account = (state = [], action) => {
  switch (action.type) {
    case REGISTER_ACCOUNT_SUCCESS:
      return (action.data) ? action.data : state
    case UPDATE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, action.data)
    case LOGIN_SUCCESS:
      return (action.data) ? action.data : state
    case LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}
