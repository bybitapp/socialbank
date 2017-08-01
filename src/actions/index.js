import server from '../api/server'
import Auth from '../modules/Auth'
import * as types from '../constants/ActionTypes'

export const addOrganization = (org, cb) => (dispatch, getState) => {
  server.addOrganization(org, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION, data})
      cb(null, data)
    } else {
      if (org.id) {
        cb('Update Failed!')
      } else {
        cb('Add Failed!')
      }
    }
  })
}

export const getOrganizations = () => dispatch => {
  server.getOrganizations((ex, organizations) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATIONS, organizations})
    }
  })
}

export const getOrganization = () => dispatch => {
  server.getOrganization((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION, data})
    }
  })
}

export const leaveOrganization = (cb) => dispatch => {
  server.leaveOrganization((ex, data) => {
    if (!ex) {
      // update information about user access
      let user = Auth.getUser()
      user.access = 'OWNER'
      Auth.updateUser(user)

      dispatch({type: types.RECEIVE_ORGANIZATION, data})
      cb(null, data)
    } else {
      cb(ex)
    }
  })
}

export const getOrganizationById = (oid) => dispatch => {
  server.getOrganizationById(oid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION, data})
    }
  })
}

export const addBankAccount = (bank, cb) => (dispatch, getState) => {
  server.addBankAccount(bank, (ex, data) => {
    if (!ex) {
      dispatch({type: types.ADD_BANKACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      cb('Add Failed!')
    }
  })
}

export const getBankAccount = () => dispatch => {
  server.getBankAccount((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_BANKACCOUNT, data})
    }
  })
}

export const getBankAccounts = () => dispatch => {
  server.getBankAccounts((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_BANKACCOUNTS, data})
    }
  })
}

export const removeBankAccount = (bid, cb) => (dispatch, getState) => {
  server.removeBankAccount(bid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REMOVE_BANKACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      cb('Remove Failed!')
    }
  })
}

export const getUsers = () => dispatch => {
  server.getUsers((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_USERS, data})
    }
  })
}

export const addUser = (values, cb) => dispatch => {
  if (values.uid) {
    server.addUser(values, (ex, data) => {
      if (!ex) {
        dispatch({type: types.UPDATE_USER, data})
        cb(null, data)
      } else {
        cb('You cannot update this user to your organization!')
      }
    })
  } else {
    server.addUser(values, (ex, data) => {
      if (!ex) {
        dispatch({type: types.ADD_USER, data})
        cb(null, data)
      } else {
        cb('You cannot add this user to your organization!')
      }
    })
  }
}

export const removeUser = (uid, cb) => dispatch => {
  server.removeUser(uid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REMOVE_USER, data})
      cb(null, data)
    } else {
      cb('You cannot remove this user from organization!')
    }
  })
}

export const getProjects = () => dispatch => {
  server.getProjects((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_PROJECTS, data})
    }
  })
}

export const getOrganizationCards = () => dispatch => {
  server.getOrganizationCards((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_CARDS, data})
    }
  })
}

export const getProjectsWithHistory = () => dispatch => {
  server.getProjects((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_PROJECTS, data})
      if (data.projects && data.projects.length) {
        server.getHistory(data.projects[0].id, (ex, data) => {
          dispatch({type: types.RECEIVE_HISTORY, data})
        })
      } else {
        let data = []
        dispatch({type: types.RECEIVE_HISTORY, data})
      }
    }
  })
}

export const getHistory = (projId) => dispatch => {
  server.getHistory(projId, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_HISTORY, data})
    }
  })
}

export const registerAccount = (account, cb) => (dispatch, getState) => {
  return server.registerAccount(account, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REGISTER_ACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.REGISTER_ACCOUNT_FAILURE, account })
      const errMsg = ex.response.data.message ? ex.response.data.message : 'Your account can not be created, please contact with us!'
      cb(errMsg)
    }
  })
}

export const updateAccount = (account, cb) => (dispatch, getState) => {
  return server.updateAccount(account, (ex, data) => {
    if (!ex) {
      Auth.updateUser(data)
      dispatch({type: types.UPDATE_ACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.UPDATE_ACCOUNT_FAILURE, account })
      cb('Your account can not be updated, please contact with us!')
    }
  })
}

export const updatePassword = (data, cb) => (dispatch, getState) => {
  return server.updatePassword(data, (ex, data) => {
    if (!ex) {
      dispatch({type: types.UPDATE_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.UPDATE_ACCOUNT_FAILURE, account })
      const errMsg = ex.response.data.message ? ex.response.data.message : 'Your password can not be updated, please contact with us!'
      cb(errMsg)
    }
  })
}

export const postForgot = (data, cb) => (dispatch, getState) => {
  return server.postForgot(data, (ex, data) => {
    if (!ex) {
      dispatch({type: types.FORGOT_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.UPDATE_ACCOUNT_FAILURE, account })
      cb('')
    }
  })
}

export const postReset = (token, cb) => (dispatch, getState) => {
  return server.postReset(token, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RESET_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.UPDATE_ACCOUNT_FAILURE, account })
      cb('')
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
    cb()
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
        const errMsg = ex.response.data.message ? ex.response.data.message : 'Update Failed!'
        cb(errMsg)
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        const errMsg = ex.response.data.message ? ex.response.data.message : 'Add Failed!'
        cb(errMsg)
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
      const errMsg = ex.response.data.message ? ex.response.data.message : 'Transfer Failed!'
      cb(errMsg)
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

export const getCardDetail = (cid, cb) => (dispatch, getState) => {
  server.getCardDetail(cid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_CARD_DETAIL, data: data})
      cb(null, data)
    } else {
      const errMsg = ex.response.data.message ? ex.response.data.message : 'Retrieve Card Detail Failed!'
      cb(errMsg)
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

export const subscribeNewsletter = (data, cb) => (dispatch, getState) => {
  server.subscribeNewsletter(data, (ex, data) => {
    if (!ex) {
      // dispatch({type: types.SUBSCRIBE_SUCCESS, data: data})
      cb(null, data)
    } else {
      const errMsg = ex.response.data.message ? ex.response.data.message : 'Failed to subscribe!'
      cb(errMsg)
    }
  })
}
