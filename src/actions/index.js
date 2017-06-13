import server from '../api/server'
import Auth from '../modules/Auth'
import * as types from '../constants/ActionTypes'

export const getOrganizations = () => dispatch => {
  server.getOrganizations((ex, organizations) => {
    dispatch({type: types.RECEIVE_ORGANIZATIONS, organizations})
  })
}

export const getOrganizationById = (oid) => dispatch => {
  server.getOrganizationById(oid, (ex, data) => {
    dispatch({type: types.RECEIVE_ORGANIZATION, data})
  })
}

export const getProjects = () => dispatch => {
  server.getProjects((ex, projects) => {
    dispatch({type: types.RECEIVE_PROJECTS, projects})
  })
}

export const getCards = (projId) => dispatch => {
  server.getCards(projId, (ex, data) => {
    dispatch({type: types.RECEIVE_CARDS, data})
  })
}

export const getHistory = (projId) => dispatch => {
  server.getHistory(projId, (ex, data) => {
    dispatch({type: types.RECEIVE_HISTORY, data})
  })
}

export const registerAccount = (account, cb) => (dispatch, getState) => {
  return server.registerAccount(account, (ex, account) => {
    if (!ex) {
      dispatch({type: types.REGISTER_ACCOUNT_SUCCESS, account})
      cb(null, account)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.REGISTER_ACCOUNT_FAILURE, account })
      cb(new Error('You account can not be created, please contact with us!'))
    }
  })
}

export const login = (account, cb) => (dispatch, getState) => {
  return server.login(account, (ex, data) => {
    if (!ex) {
      Auth.authenticateUser(data)
      dispatch({type: types.LOGIN_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.LOGIN_FAILURE, account })
      cb(new Error('Login Failed!'))
    }
  })
}

export const logout = (cb) => (dispatch, getState) => {
  return server.logout((ex, data) => {
    Auth.deauthenticateUser()
    dispatch({type: types.LOGOUT_SUCCESS})
  })
}

export const isLoggedIn = (cb) => (dispatch, getState) => {
  return server.isLoggedIn((err, data) => {
    cb(err, data)
  })
}

export const addProject = (project, cb) => (dispatch, getState) => {
  server.addProject(project, (ex, data) => {
    if (project.pid) {
      if (!ex) {
        dispatch({type: types.UPDATE_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        cb(new Error('Update Failed!'))
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        cb(new Error('Add Failed!'))
      }
    }
  })
}

export const closeProject = (project, cb) => (dispatch, getState) => {
  server.closeProject(project, (ex, data) => {
    if (!ex) {
      dispatch({type: types.CLOSE_PROJECT_SUCCESS, projectId: data.projectId})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
      cb(new Error('Close Failed!'))
    }
  })
}

export const depositProject = (project, cb) => (dispatch, getState) => {
  server.depositProject(project, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DEPOSIT_PROJECT_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
      cb(new Error('Deposit Failed!'))
    }
  })
}

export const addCard = (card, cb) => (dispatch, getState) => {
  server.addCard(card, (ex, data) => {
    if (card.cid) {
      if (!ex) {
        dispatch({type: types.UPDATE_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        cb(new Error('Update Failed!'))
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        cb(new Error('Add Failed!'))
      }
    }
  })
}

export const transferCard = (project, cb) => (dispatch, getState) => {
  server.transferCard(project, (ex, data) => {
    if (!ex) {
      dispatch({type: types.TRANSFER_CARD_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.ADD_PROJECT_FAILURE, projects })
      cb(new Error('Transfer Failed!'))
    }
  })
}

export const destroyCard = (card, cb) => (dispatch, getState) => {
  server.destroyCard(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DESTROY_CARD_SUCCESS, data: data})
      cb(null, data)
    } else {
      cb(new Error('Destroy Failed!'))
    }
  })
}

export const selectCurrentProject = id => dispatch => {
  dispatch({type: types.SELECT_CURRENT_PROJECT, id})
}

export const sendMessage = (contact, cb) => (dispatch, getState) => {
  server.sendMessage(contact, (ex, data) => {
    if (!ex) {
      dispatch({type: types.SEND_MESSAGE_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.SEND_MESSAGE_FAILURE, projects })
      cb(new Error('Send Message Failed!'))
    }
  })
}
