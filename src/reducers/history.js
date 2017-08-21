import { RECEIVE_HISTORY_SUCCESS } from '../constants/ActionTypes'

export const history = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_HISTORY_SUCCESS:
      return (action.data) ? action.data : state
    default:
      return state
  }
}
