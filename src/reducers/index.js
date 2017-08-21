import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { projects } from './projects'
import { account } from './account'
import { cards } from './cards'
import { organizations } from './organizations'
import { userOrg } from './userOrg'
import { banks } from './banks'
import { users } from './users'
import { history } from './history'
import { reducer as toastr } from 'react-redux-toastr'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'

export default combineReducers({
  projects,
  account,
  cards,
  organizations,
  userOrg,
  history,
  banks,
  form,
  users,
  toastr,
  loadingBar
})
