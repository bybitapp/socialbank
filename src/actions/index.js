import server from '../api/server'
import * as types from '../constants/ActionTypes'

export const getProjects = () => dispatch => {
  server.getProjects((ex, projects) => {
    dispatch({type: types.RECEIVE_PROJECTS, projects})
  })
}

export const addProject = (project, cb) => (dispatch, getState) => {
  server.addProject(project, (ex, project) => {
    if (!ex) {
        dispatch({type: types.ADD_PROJECT_SUCCESS, project})
    }
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
    cb();
  })
}

export const addCard = (card, cb) => (dispatch, getState) => {
  server.addCard(card, (ex, card) => {
    if (!ex) {
        dispatch({type: types.ADD_CARD_SUCCESS, card})
    }
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
    cb();
  })
}

export const selectCurrentProject = id => dispatch => {
  dispatch({type: types.SELECT_CURRENT_PROJECT, id})
}
