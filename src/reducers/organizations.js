import { RECEIVE_ORGANIZATIONS_SUCCESS } from '../constants/ActionTypes'

export const organizations = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ORGANIZATIONS_SUCCESS:
      return (action.data) ? action.data : state
    default:
      return state
  }
}
