import { RECEIVE_ORGANIZATION } from '../constants/ActionTypes'

export const userOrganization = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ORGANIZATION:
      return (action.data) ? action.data : state
    default:
      return state
  }
}
