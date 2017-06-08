import server from '../api/server'
import * as types from '../constants/ActionTypes'

export const getOrganizations = () => dispatch => {
  server.getOrganizations((ex, organizations) => {
    dispatch({type: types.RECEIVE_ORGANIZATIONS, organizations})
  })
}

export const getProjects = () => dispatch => {
  server.getProjects((ex, projects) => {
    dispatch({type: types.RECEIVE_PROJECTS, projects})
  })
}

export const getCards = (projId) => dispatch => {
  server.getCards(projId, (ex, cards) => {
    dispatch({type: types.RECEIVE_CARDS, cards})
  })
}

export const registerAccount = (account, cb) => (dispatch, getState) => {
  return server.registerAccount(account, (ex, account) => {
    if (!ex) {
      dispatch({type: types.REGISTER_ACCOUNT_SUCCESS, account})
      cb(null, account)
    } else {
      // Replace the line above with line below to rollback on failure:
      //return dispatch({ type: types.REGISTER_ACCOUNT_FAILURE, account })
      cb('You account can not be created, please contact with us!')
    }
  })
}

export const login = (account, cb) => (dispatch, getState) => {
  return server.login(account, (ex, data) => {
    if (!ex) {
      dispatch({type: types.LOGIN_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      //return dispatch({ type: types.LOGIN_FAILURE, account })
      cb('Login Failed!')
    }
  })
}

export const addProject = (project, cb) => (dispatch, getState) => {
  server.addProject(project, (ex, data) => {
    if (project.pid) {
      if (!ex) {
        dispatch({type: types.UPDATE_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        cb('Update Failed!');
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        cb('Add Failed!');
      }
    }
  })
}

export const closeProject = (project, cb) => (dispatch, getState) => {
  server.closeProject(project, (ex, project) => {
    if (!ex) {
        dispatch({type: types.CLOSE_PROJECT_SUCCESS, project})
        cb(null, project)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
      cb('Close Failed!')
    }
  })
}

export const depositProject = (project, cb) => (dispatch, getState) => {
  server.depositProject(project, (ex, project) => {
    if (!ex) {
        dispatch({type: types.DEPOSIT_PROJECT_SUCCESS, project})
        cb(null, project)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
      cb('Deposit Failed!')
    }
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
