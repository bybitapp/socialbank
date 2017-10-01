import Security from './Security'

const TOKEN_KEY = 'TOKEN_KEY'

class Auth {
  static init () {
    var token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      Security.associate(localStorage.getItem(TOKEN_KEY))
    }
  }

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser (token) {
    Security.associate(token, () => {
      localStorage.setItem(TOKEN_KEY, token)
      // localStorage.setItem('auth', JSON.stringify({
      //   user: user,
      //   expiryTime: Date.now() + (1000 * 60 * 15) // 15 min
      // }))
    })
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated () {
    const auth = JSON.parse(localStorage.getItem('auth'))
    return auth !== null && Date.now() < auth.expiryTime
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser () {
    Security.associate(null, () => {
      localStorage.removeItem(TOKEN_KEY)
      // localStorage.removeItem('auth')
    })
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getUser () {
    const auth = JSON.parse(localStorage.getItem('auth'))
    return auth.user
  }

  /**
   * Update session user.
   *
   * @returns {string}
   */

  static updateUser (updatedUser) {
    const auth = JSON.parse(localStorage.getItem('auth'))

    var user = auth.user
    if (user) {
      user = Object.assign({}, user, updatedUser)
    }
    this.authenticateUser(user)
  }
}

export default Auth
