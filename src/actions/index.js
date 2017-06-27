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

export const getProjectsByOrgId = (pid) => dispatch => {
  server.getProjectsByOrgId(pid, (ex, data) => {
    dispatch({type: types.RECEIVE_PROJECTS, data})
  })
}

export const getProjectsWithCards = (pid) => dispatch => {
  server.getProjectsByOrgId(pid, (ex, data) => {
    dispatch({type: types.RECEIVE_PROJECTS, data})
    if (data.projects && data.projects.length) {
      server.getCards(data.projects[0].id, (ex, data) => {
        dispatch({type: types.RECEIVE_CARDS, data})
      })
    } else {
      let data = {projects: []}
      dispatch({type: types.RECEIVE_CARDS, data})
    }
  })
}

export const getProjectsWithHistory = (pid) => dispatch => {
  server.getProjectsByOrgId(pid, (ex, data) => {
    dispatch({type: types.RECEIVE_PROJECTS, data})
    if (data.projects && data.projects.length) {
      server.getHistory(data.projects[0].id, (ex, data) => {
        dispatch({type: types.RECEIVE_HISTORY, data})
      })
    } else {
      let data = []
      dispatch({type: types.RECEIVE_HISTORY, data})
    }
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
      cb('You account can not be created, please contact with us!')
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
      cb('Login Failed!')
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
        cb('Update Failed!')
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        cb('Add Failed!')
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
      cb('Close Failed!')
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
      cb('Deposit Failed!')
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
        if (ex.response.data.msg) {
          cb(ex.response.data.msg)
        } else {
          cb('Update Failed!')
        }
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        if (ex.response.data.msg) {
          cb(ex.response.data.msg)
        } else {
          cb('Add Failed!')
        }
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
      cb('Transfer Failed!')
    }
  })
}

export const destroyCard = (card, cb) => (dispatch, getState) => {
  server.destroyCard(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DESTROY_CARD_SUCCESS, data: data})
      cb(null, data)
    } else {
      cb('Destroy Failed!')
    }
  })
}

export const updateCardStatus = (card, cb) => (dispatch, getState) => {
  server.updateCardStatus(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.UPDATE_CARD_STATUS_SUCCESS, data: data})
      cb(null, data)
    } else {
      cb('Update Card Status Failed!')
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
      cb('Send Message Failed!')
    }
  })
}

export const sessionSetTemp = (data, cb) => (dispatch, getState) => {
  dispatch({type: types.LOGIN_SESSION_TEMP, data})
}
