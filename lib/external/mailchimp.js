const Mailchimp = require('mailchimp-client')
const config = require('config')

const mailchimp = new Mailchimp({
  apiKey: config.mailchimp.apiKey,
  host: 'https://us16.api.mailchimp.com'
})

/**
 * add a user to the mailchimp mailing list
 * @param {String}  email    emailid
 * @returns {Object} mailchimp response
 */
exports.subscribe = function (email) {
  if (!email) {
    throw new Error('email required')
  }

  /*
   * Success
   * {
   *   'email': 'test@example.com',
   *   'euid': 'example euid',
   *   'leid': 'example leid'
   * }
   * Error
   * {
   *   'status': 'error',
   *   'code': -99,
   *   'name': 'Unknown_Exception',
   *   'error': 'An unknown error occurred processing your request.  Please try again later.'
   * }
   * Email_NotExists
   * List_AlreadySubscribed
   * List_DoesNotExist
   * Invalid_ApiKey  The API Key provided is invalid, revoked, you're in the wrong data center, or whatever the error message says.
   * User_Disabled The account being accessed has been disabled - more detail in the actual message returned.
   * User_InvalidRole  The account being accessed does not have permission to access the API method
   * Too_Many_Connections  You didn't pay attention to this
   * User_UnderMaintenance The account being access is currently under temporary maintenance
   * User_InvalidAction  The account being accessed has not been approved for some action - more detail in the actual message returned.
   * ValidationError The parameters passed to the API call are invalid or not provided when required
   */

  const path = `lists/${config.mailchimp.mailingListId}/members`
  return mailchimp.post(path, {
    body: {
      'email_address': email,
      'status': 'subscribed'
    }
  })
}
