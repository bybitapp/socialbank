const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendInviteUser (newUser, org, tempPassword) {
  // todo: get the user who invited
  const subject = `SoTec - You are invited you to join the ${org.name} organization`
  const from = `${config.support.name} <${config.support.email}>`
  const to = newUser.email
  const content = {
    text: `
    Hi, You are invited you to join the ${org.name} organization on SoTec.
    Head over to ${config.app.url}/login/ \n\n to check out ${org.name}'s profile.\n\n
    Your temporary password: ${tempPassword}\n
    Please change a password on the first login\n\n`
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      logger.info('Invitation sent to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
