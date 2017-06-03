import { RECEIVE_CARDS, ADD_CARD_SUCCESS } from '../constants/ActionTypes'

export const cards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PROJECT_CARDS:
      return (action.projectCards) ? action.projectCards : state
    default:
      return state
  }
}
