import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { projects } from './projects'

export default combineReducers({
  projects,
  form
})
