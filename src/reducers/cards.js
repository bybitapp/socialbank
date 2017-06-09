import { RECEIVE_CARDS, ADD_CARD_SUCCESS } from '../constants/ActionTypes'

export const cards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CARDS:
      return (action.data) ? action.data : state
    case ADD_CARD_SUCCESS:
      return state.concat(action.data)
    default:
      return state
  }
}
