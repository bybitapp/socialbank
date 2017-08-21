import server from '../api/server'
import Auth from '../modules/Auth'
import * as types from '../constants/ActionTypes'

function handleError (e, cb, defaultMsg) {
  const errorMsg = 'Our engineering team has been notified of the problem. Please contact us for any urgent issues.'

  if (e.response.status === 500) {
    cb(errorMsg)
  } else if (e.response.data.message) {
    cb(e.response.data.message)
  } else if (defaultMsg) {
    cb(defaultMsg)
  } else {
    cb(errorMsg)
  }
}

export const addOrganization = (org, cb) => (dispatch, getState) => {
  server.addOrganization(org, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION_SUCCESS, data})
      cb(null, data)
    } else {
      if (org.id) {
        handleError(ex, cb, 'Update Failed!')
      } else {
        handleError(ex, cb, 'Add Failed!')
      }
    }
  })
}

export const getOrganizations = () => dispatch => {
  server.getOrganizations((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATIONS_SUCCESS, data})
    }
  })
}

export const getOrganization = () => dispatch => {
  server.getOrganization((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION_SUCCESS, data})
    }
  })
}

export const getOrganizationById = (oid) => dispatch => {
  server.getOrganizationById(oid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION_SUCCESS, data})
    }
  })
}

export const addBankAccount = (bank, cb) => (dispatch, getState) => {
  server.addBankAccount(bank, (ex, data) => {
    if (!ex) {
      dispatch({type: types.ADD_BANKACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'Add Failed!')
    }
  })
}

export const getBankAccount = () => dispatch => {
  server.getBankAccount((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_BANKACCOUNT_SUCCESS, data})
    }
  })
}

export const getBankAccounts = () => dispatch => {
  server.getBankAccounts((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_BANKACCOUNTS_SUCCESS, data})
    }
  })
}

export const removeBankAccount = (bid, cb) => (dispatch, getState) => {
  server.removeBankAccount(bid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REMOVE_BANKACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'Remove Failed!')
    }
  })
}

export const getUsers = () => dispatch => {
  server.getUsers((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_USERS_SUCCESS, data})
    }
  })
}

export const addUser = (values, cb) => dispatch => {
  if (values.uid) {
    server.addUser(values, (ex, data) => {
      if (!ex) {
        dispatch({type: types.UPDATE_USER_SUCCESS, data})
        cb(null, data)
      } else {
        handleError(ex, cb, 'You cannot update this user to your organization!')
      }
    })
  } else {
    server.addUser(values, (ex, data) => {
      if (!ex) {
        dispatch({type: types.ADD_USER_SUCCESS, data})
        cb(null, data)
      } else {
        handleError(ex, cb, 'You cannot add this user to your organization!')
      }
    })
  }
}

export const removeUser = (uid, cb) => dispatch => {
  server.removeUser(uid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REMOVE_USER_SUCCESS, data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'You cannot remove this user from organization!')
    }
  })
}

export const getProjects = () => dispatch => {
  server.getProjects((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_PROJECTS_SUCCESS, data})
    }
  })
}

export const getOrganizationCards = () => dispatch => {
  server.getOrganizationCards((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_CARDS_SUCCESS, data})
    }
  })
}

export const getProjectsWithHistory = () => dispatch => {
  server.getProjects((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_PROJECTS_SUCCESS, data})
      if (data.projects && data.projects.length) {
        server.getHistory(data.projects[0].id, (ex, data) => {
          dispatch({type: types.RECEIVE_HISTORY_SUCCESS, data})
        })
      } else {
        let data = []
        dispatch({type: types.RECEIVE_HISTORY_SUCCESS, data})
      }
    }
  })
}

export const getHistory = (projId) => dispatch => {
  server.getHistory(projId, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_HISTORY_SUCCESS, data})
    }
  })
}

export const demoAccount = (account, cb) => (dispatch, getState) => {
  return server.demoAccount(account, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DEMO_ACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.REGISTER_ACCOUNT_FAILURE, account })
      handleError(ex, cb, 'Your demo account can not be created, please contact with us!')
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
      handleError(ex, cb, 'Your account can not be updated, please contact with us!')
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
      handleError(ex, cb, 'Your password can not be updated, please contact with us!')
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
      handleError(ex, cb, '')
    }
  })
}

export const postReset = (token, values, cb) => (dispatch, getState) => {
  return server.postReset(token, values, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RESET_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // return dispatch({ type: types.UPDATE_ACCOUNT_FAILURE, account })
      handleError(ex, cb, '')
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
      handleError(ex, cb, 'Login Failed!')
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
        handleError(ex, cb, 'Update Failed!')
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        handleError(ex, cb, 'Add Failed!')
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
      handleError(ex, cb, 'Close Failed!')
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
      handleError(ex, cb, 'Deposit Failed!')
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
        handleError(ex, cb, 'Update Failed!')
      }
    } else {
      if (!ex) {
        dispatch({type: types.ADD_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        handleError(ex, cb, 'Add Failed!')
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
      handleError(ex, cb, 'Transfer Failed!')
    }
  })
}

export const destroyCard = (card, cb) => (dispatch, getState) => {
  server.destroyCard(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DESTROY_CARD_SUCCESS, data: data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'Destroy Failed!')
    }
  })
}

export const updateCardStatus = (card, cb) => (dispatch, getState) => {
  server.updateCardStatus(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.UPDATE_CARD_STATUS_SUCCESS, data: data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'Update Card Status Failed!')
    }
  })
}

export const getCardDetail = (cid, cb) => (dispatch, getState) => {
  server.getCardDetail(cid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_CARD_DETAIL_SUCCESS, data: data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'Retrieve Card Detail Failed!')
    }
  })
}

export const selectCurrentProject = id => dispatch => {
  dispatch({type: types.SELECT_CURRENT_PROJECT_SUCCESS, id})
}

export const sendMessage = (contact, cb) => (dispatch, getState) => {
  server.sendMessage(contact, (ex, data) => {
    if (!ex) {
      dispatch({type: types.SEND_MESSAGE_SUCCESS, data})
      cb(null, data)
    } else {
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.SEND_MESSAGE_FAILURE, projects })
      handleError(ex, cb, 'Send Message Failed!')
    }
  })
}

export const subscribeNewsletter = (data, cb) => (dispatch, getState) => {
  server.subscribeNewsletter(data, (ex, data) => {
    if (!ex) {
      // dispatch({type: types.SUBSCRIBE_SUCCESS, data: data})
      cb(null, data)
    } else {
      handleError(ex, cb, 'Failed to subscribe!')
    }
  })
}
