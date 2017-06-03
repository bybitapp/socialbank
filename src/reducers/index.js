import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { projects } from './projects'
import { account } from './account'
import { cards } from './cards'

export default combineReducers({
  projects,
  account,
  cards,
  projectCards,
  form
})
