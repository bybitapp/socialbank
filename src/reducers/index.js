import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { projects } from './projects'
import { account } from './account'

export default combineReducers({
  projects,
  account,
  form
})
