const got = require('got')
const { get } = require('lodash')

const errors = require('lib/errors')
const logger = require('lib/logger')
const config = require('config')

module.exports = function captchaMiddlewareGenerator (useCaptcha) {
  return function captchaMiddleware (req, res, next) {
    if (!useCaptcha || !config.captcha.enabled) {
      return next()
    }

    const captcha = get(req, 'body.captcha')
    logger.debug('Received captcha', captcha)
    if (!captcha) {
      return next()

      // todo: if capcha is not shown on UI then req fails. so temp no err thrown
      // const error = new errors.ValidationError('No captcha key given', {
      //   captchaKey: {
      //     invalid: 'No captcha key given'
      //   }
      // })
      // return next(error)
    }

    verifyCapcha(captcha)
      .then(() => {
        return next()
      })
      .catch(() => {
        const error = new errors.ValidationError('Incorrect captcha key', {
          captchaKey: {
            invalid: 'Captcha key was invalid'
          }
        })
        return next(error)
      })
  }
}

function verifyCapcha (captcha) {
  return got('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: {
      secret: config.captcha.secretKey,
      response: captcha
    }
  }).then((response) => {
    const respBody = JSON.parse(get(response, 'body'))
    logger.debug('Google recaptcha response', respBody)
    if (respBody.success !== true) {
      logger.error('Google recaptcha errors', respBody['error-codes'])
      throw new Error(response.body['error-codes'])
    }
    logger.debug('Google recaptcha success')
    return respBody.success
  })
}
