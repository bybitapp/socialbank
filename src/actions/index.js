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
  dispatch({type: types.RECEIVE_ORGANIZATION_REQUEST})
  server.addOrganization(org, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.RECEIVE_ORGANIZATION_FAILURE})
      if (org.id) {
        handleError(ex, cb, 'Update Failed!')
      } else {
        handleError(ex, cb, 'Add Failed!')
      }
    }
  })
}

export const getOrganizations = () => dispatch => {
  dispatch({type: types.RECEIVE_ORGANIZATIONS_REQUEST})
  server.getOrganizations((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATIONS_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_ORGANIZATIONS_FAILURE})
    }
  })
}

export const getOrganization = () => dispatch => {
  dispatch({type: types.RECEIVE_ORGANIZATION_REQUEST})
  server.getOrganization((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_ORGANIZATION_FAILURE})
    }
  })
}

export const getOrganizationById = (oid) => dispatch => {
  dispatch({type: types.RECEIVE_ORGANIZATION_REQUEST})
  server.getOrganizationById(oid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_ORGANIZATION_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_ORGANIZATION_FAILURE})
    }
  })
}

export const addBankAccount = (bank, cb) => (dispatch, getState) => {
  dispatch({type: types.ADD_BANKACCOUNT_REQUEST})
  server.addBankAccount(bank, (ex, data) => {
    if (!ex) {
      dispatch({type: types.ADD_BANKACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.ADD_BANKACCOUNT_FAILURE, data})
      handleError(ex, cb, 'Add Failed!')
    }
  })
}

export const getBankAccount = () => dispatch => {
  dispatch({type: types.RECEIVE_BANKACCOUNT_REQUEST})
  server.getBankAccount((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_BANKACCOUNT_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_BANKACCOUNT_FAILURE})
    }
  })
}

export const getBankAccounts = () => dispatch => {
  dispatch({type: types.RECEIVE_BANKACCOUNTS_REQUEST})
  server.getBankAccounts((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_BANKACCOUNTS_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_BANKACCOUNTS_FAILURE})
    }
  })
}

export const removeBankAccount = (bid, cb) => (dispatch, getState) => {
  dispatch({type: types.REMOVE_BANKACCOUNT_REQUEST})
  server.removeBankAccount(bid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REMOVE_BANKACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.REMOVE_BANKACCOUNT_FAILURE})
      handleError(ex, cb, 'Remove Failed!')
    }
  })
}

export const getUsers = () => dispatch => {
  dispatch({type: types.RECEIVE_USERS_REQUEST})
  server.getUsers((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_USERS_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_USERS_FAILURE})
    }
  })
}

export const addUser = (values, cb) => dispatch => {
  if (values.uid) {
    dispatch({type: types.UPDATE_USER_REQUEST})
    server.addUser(values, (ex, data) => {
      if (!ex) {
        dispatch({type: types.UPDATE_USER_SUCCESS, data})
        cb(null, data)
      } else {
        dispatch({type: types.UPDATE_USER_FAILURE})
        handleError(ex, cb, 'You cannot update this user to your organization!')
      }
    })
  } else {
    dispatch({type: types.ADD_USER_REQUEST})
    server.addUser(values, (ex, data) => {
      if (!ex) {
        dispatch({type: types.ADD_USER_SUCCESS, data})
        cb(null, data)
      } else {
        dispatch({type: types.ADD_USER_FAILURE})
        handleError(ex, cb, 'You cannot add this user to your organization!')
      }
    })
  }
}

export const removeUser = (uid, cb) => dispatch => {
  dispatch({type: types.REMOVE_USER_REQUEST})
  server.removeUser(uid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.REMOVE_USER_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.REMOVE_USER_FAILURE})
      handleError(ex, cb, 'You cannot remove this user from organization!')
    }
  })
}

export const getProjects = () => dispatch => {
  dispatch({type: types.RECEIVE_PROJECTS_REQUEST})
  server.getProjects((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_PROJECTS_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_PROJECTS_FAILURE})
    }
  })
}

export const getOrganizationCards = () => dispatch => {
  dispatch({type: types.RECEIVE_CARDS_REQUEST})
  server.getOrganizationCards((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_CARDS_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_CARDS_FAILURE})
    }
  })
}

export const getProjectsWithHistory = () => dispatch => {
  dispatch({type: types.RECEIVE_PROJECTS_REQUEST})
  server.getProjects((ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_PROJECTS_SUCCESS, data})
      if (data.projects && data.projects.length) {
        dispatch({type: types.RECEIVE_HISTORY_REQUEST})
        server.getHistory(data.projects[0].id, (ex, data) => {
          if (!ex) {
            dispatch({type: types.RECEIVE_HISTORY_SUCCESS, data})
          } else {
            dispatch({type: types.RECEIVE_HISTORY_FAILURE})
          }
        })
      } else {
        let data = []
        dispatch({type: types.RECEIVE_HISTORY_SUCCESS, data})
      }
    } else {
      dispatch({type: types.RECEIVE_PROJECTS_FAILURE})
    }
  })
}

export const getHistory = (projId) => dispatch => {
  dispatch({type: types.RECEIVE_HISTORY_REQUEST})
  server.getHistory(projId, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_HISTORY_SUCCESS, data})
    } else {
      dispatch({type: types.RECEIVE_HISTORY_FAILURE})
    }
  })
}

export const demoAccount = (account, cb) => (dispatch, getState) => {
  dispatch({type: types.DEMO_ACCOUNT_REQUEST})
  return server.demoAccount(account, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DEMO_ACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.DEMO_ACCOUNT_FAILURE, account})
      handleError(ex, cb, 'Your demo account can not be created, please contact with us!')
    }
  })
}

export const updateAccount = (account, cb) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_ACCOUNT_REQUEST})
  return server.updateAccount(account, (ex, data) => {
    if (!ex) {
      Auth.updateUser(data)
      dispatch({type: types.UPDATE_ACCOUNT_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.UPDATE_ACCOUNT_FAILURE, account})
      handleError(ex, cb, 'Your account can not be updated, please contact with us!')
    }
  })
}

export const updatePassword = (data, cb) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_PASSWORD_REQUEST})
  return server.updatePassword(data, (ex, data) => {
    if (!ex) {
      dispatch({type: types.UPDATE_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.UPDATE_PASSWORD_FAILURE})
      handleError(ex, cb, 'Your password can not be updated, please contact with us!')
    }
  })
}

export const postForgot = (data, cb) => (dispatch, getState) => {
  dispatch({type: types.FORGOT_PASSWORD_REQUEST})
  return server.postForgot(data, (ex, data) => {
    if (!ex) {
      dispatch({type: types.FORGOT_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.FORGOT_PASSWORD_FAILURE})
      handleError(ex, cb, '')
    }
  })
}

export const postReset = (token, values, cb) => (dispatch, getState) => {
  dispatch({type: types.RESET_PASSWORD_REQUEST})
  return server.postReset(token, values, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RESET_PASSWORD_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.RESET_PASSWORD_FAILURE})
      handleError(ex, cb, '')
    }
  })
}

export const login = (account, cb) => (dispatch, getState) => {
  dispatch({type: types.LOGIN_REQUEST})
  return server.login(account, (ex, data) => {
    if (!ex) {
      Auth.authenticateUser(data)
      dispatch({type: types.LOGIN_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.LOGIN_FAILURE})
      handleError(ex, cb, 'Login Failed!')
    }
  })
}

export const logout = (cb) => (dispatch, getState) => {
  dispatch({type: types.LOGOUT_REQUEST})
  return server.logout((ex, data) => {
    Auth.deauthenticateUser()
    dispatch({type: types.LOGOUT_SUCCESS})
    cb()
  })
}

export const addProject = (project, cb) => (dispatch, getState) => {
  if (project.pid) {
    dispatch({type: types.UPDATE_PROJECT_REQUEST})
    server.addProject(project, (ex, data) => {
      if (!ex) {
        dispatch({type: types.UPDATE_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        dispatch({type: types.UPDATE_PROJECT_FAILURE})
        handleError(ex, cb, 'Update Failed!')
      }
    })
  } else {
    dispatch({type: types.ADD_PROJECT_REQUEST})
    server.addProject(project, (ex, data) => {
      if (!ex) {
        dispatch({type: types.ADD_PROJECT_SUCCESS, data})
        cb(null, data)
      } else {
        dispatch({type: types.ADD_PROJECT_FAILURE})
        handleError(ex, cb, 'Add Failed!')
      }
    })
  }
}

export const closeProject = (project, cb) => (dispatch, getState) => {
  dispatch({type: types.CLOSE_PROJECT_REQUEST})
  server.closeProject(project, (ex, data) => {
    if (!ex) {
      dispatch({type: types.CLOSE_PROJECT_SUCCESS, projectId: data.projectId})
      cb(null, data)
    } else {
      dispatch({type: types.CLOSE_PROJECT_FAILURE})
      handleError(ex, cb, 'Close Failed!')
    }
  })
}

export const depositProject = (project, cb) => (dispatch, getState) => {
  dispatch({type: types.DEPOSIT_PROJECT_REQUEST})
  server.depositProject(project, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DEPOSIT_PROJECT_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.DEPOSIT_PROJECT_FAILURE})
      handleError(ex, cb, 'Deposit Failed!')
    }
  })
}

export const addCard = (card, cb) => (dispatch, getState) => {
  if (card.cid) {
    dispatch({type: types.UPDATE_CARD_REQUEST})
    server.addCard(card, (ex, data) => {
      if (!ex) {
        dispatch({type: types.UPDATE_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        dispatch({type: types.UPDATE_CARD_FAILURE})
        handleError(ex, cb, 'Update Failed!')
      }
    })
  } else {
    dispatch({type: types.ADD_CARD_REQUEST})
    server.addCard(card, (ex, data) => {
      if (!ex) {
        dispatch({type: types.ADD_CARD_SUCCESS, data})
        cb(null, data)
      } else {
        dispatch({type: types.ADD_CARD_FAILURE})
        handleError(ex, cb, 'Add Failed!')
      }
    })
  }
}

export const transferCard = (project, cb) => (dispatch, getState) => {
  dispatch({type: types.TRANSFER_CARD_REQUEST})
  server.transferCard(project, (ex, data) => {
    if (!ex) {
      dispatch({type: types.TRANSFER_CARD_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.TRANSFER_CARD_FAILURE})
      handleError(ex, cb, 'Transfer Failed!')
    }
  })
}

export const destroyCard = (card, cb) => (dispatch, getState) => {
  dispatch({type: types.DESTROY_CARD_REQUEST})
  server.destroyCard(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.DESTROY_CARD_SUCCESS, data: data})
      cb(null, data)
    } else {
      dispatch({type: types.DESTROY_CARD_FAILURE})
      handleError(ex, cb, 'Destroy Failed!')
    }
  })
}

export const updateCardStatus = (card, cb) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_CARD_STATUS_REQUEST})
  server.updateCardStatus(card, (ex, data) => {
    if (!ex) {
      dispatch({type: types.UPDATE_CARD_STATUS_SUCCESS, data: data})
      cb(null, data)
    } else {
      dispatch({type: types.UPDATE_CARD_STATUS_FAILURE})
      handleError(ex, cb, 'Update Card Status Failed!')
    }
  })
}

export const getCardDetail = (cid, cb) => (dispatch, getState) => {
  dispatch({type: types.RECEIVE_CARD_DETAIL_REQUEST})
  server.getCardDetail(cid, (ex, data) => {
    if (!ex) {
      dispatch({type: types.RECEIVE_CARD_DETAIL_SUCCESS, data: data})
      cb(null, data)
    } else {
      dispatch({type: types.RECEIVE_CARD_DETAIL_FAILURE})
      handleError(ex, cb, 'Retrieve Card Detail Failed!')
    }
  })
}

export const selectCurrentProject = id => dispatch => {
  dispatch({type: types.SELECT_CURRENT_PROJECT_SUCCESS, id})
}

export const sendMessage = (contact, cb) => (dispatch, getState) => {
  dispatch({type: types.SEND_MESSAGE_REQUEST})
  server.sendMessage(contact, (ex, data) => {
    if (!ex) {
      dispatch({type: types.SEND_MESSAGE_SUCCESS, data})
      cb(null, data)
    } else {
      dispatch({type: types.SEND_MESSAGE_FAILURE})
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
