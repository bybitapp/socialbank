import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { projects } from './projects'
import { account } from './account'
import { cards } from './cards'
import { organizations } from './organizations'
import { history } from './history'

export default combineReducers({
  projects,
  account,
  cards,
  organizations,
  history,
  form
})
