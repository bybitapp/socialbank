import { RECEIVE_CARDS, ADD_CARD_SUCCESS } from '../constants/ActionTypes'

export const cards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CARDS:
      return (action.cards) ? action.cards : state
    case ADD_CARD_SUCCESS:
      return state.concat(action.card)
    default:
      return state
  }
}
