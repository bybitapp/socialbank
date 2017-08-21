import {
  RECEIVE_CARDS_SUCCESS, ADD_CARD_SUCCESS, UPDATE_CARD_SUCCESS, DESTROY_CARD_SUCCESS,
  TRANSFER_CARD_SUCCESS, UPDATE_CARD_STATUS_SUCCESS, RECEIVE_CARD_DETAIL_SUCCESS
} from '../constants/ActionTypes'

export const cards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CARDS_SUCCESS:
      return (action.data) ? action.data : state
    case ADD_CARD_SUCCESS:
      return state.concat(action.data)
    case UPDATE_CARD_SUCCESS:
      const updateResult = state.map(item => {
        if (item.id === action.data.id) {
          item.name = action.data.name
        }
        return item
      })
      return updateResult
    case UPDATE_CARD_STATUS_SUCCESS:
      const updateStatusResult = state.map(item => {
        if (item.id === action.data.id) {
          item.status = action.data.status
        }
        return item
      })
      return updateStatusResult
    case DESTROY_CARD_SUCCESS:
      const deleteResult = state.filter(item => {
        return item.id !== action.data.id
      })
      return deleteResult
    case TRANSFER_CARD_SUCCESS:
      return state.map(item => {
        if (item.id === action.data.cardId) {
          item.balances.actual += action.data.amount
        }
        return item
      })
    case RECEIVE_CARD_DETAIL_SUCCESS:
      // Do not store card detail data
      return state
    default:
      return state
  }
}
