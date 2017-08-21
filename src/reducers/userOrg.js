import { RECEIVE_ORGANIZATION_SUCCESS } from '../constants/ActionTypes'

export const userOrg = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ORGANIZATION_SUCCESS:
      return (action.data) ? action.data : state
    default:
      return state
  }
}
