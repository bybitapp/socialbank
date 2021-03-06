import { RECEIVE_BANKACCOUNTS_SUCCESS, ADD_BANKACCOUNT_SUCCESS, REMOVE_BANKACCOUNT_SUCCESS } from '../constants/ActionTypes'

export const banks = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BANKACCOUNTS_SUCCESS:
      return (action.data) ? action.data : state
    case ADD_BANKACCOUNT_SUCCESS:
      return state.concat(action.data)
    case REMOVE_BANKACCOUNT_SUCCESS:
      return state.filter(item => {
        return item.id !== action.data.bankId
      })
    default:
      return state
  }
}
