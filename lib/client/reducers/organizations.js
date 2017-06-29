import { RECEIVE_ORGANIZATIONS, RECEIVE_ORGANIZATION } from '../constants/ActionTypes'

export const organizations = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ORGANIZATIONS:
      return (action.organizations) ? action.organizations : state
    case RECEIVE_ORGANIZATION:
      return action.data
    default:
      return state
  }
}
