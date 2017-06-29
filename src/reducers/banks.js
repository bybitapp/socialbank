import { RECEIVE_BANKACCOUNTS, RECEIVE_BANKACCOUNT } from '../constants/ActionTypes'

export const banks = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BANKACCOUNTS:
      return (action.data) ? action.data : state
    case RECEIVE_BANKACCOUNT:
      return action.data
    default:
      return state
  }
}
