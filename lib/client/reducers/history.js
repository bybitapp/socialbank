import { RECEIVE_HISTORY } from '../constants/ActionTypes'

export const history = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_HISTORY:
      return (action.data) ? action.data : state
    default:
      return state
  }
}
