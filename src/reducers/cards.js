import { RECEIVE_CARDS, ADD_CARD_SUCCESS, UPDATE_CARD_SUCCESS, DESTROY_CARD_SUCCESS } from '../constants/ActionTypes'

export const cards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CARDS:
      return (action.data) ? action.data : state
    case ADD_CARD_SUCCESS:
      return state.concat(action.data)
    case UPDATE_CARD_SUCCESS:
      const updateResult = state.map(item => {
        if (item.id === action.data.id) {
          item.name = action.data.name
          item.status = action.data.status
        }
        return item
      })
      return updateResult
    case DESTROY_CARD_SUCCESS:
      const deleteResult = state.filter(item => {
        return item.id !== action.data.id

      })
      return deleteResult
    default:
      return state
  }
}
