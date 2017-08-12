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
    if (!captcha) {
      const error = new errors.ValidationError('No captcha key given', {
        captchaKey: {
          invalid: 'No captcha key given'
        }
      })
      return next(error)
    }

    verifyCapcha()
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
    const success = get(response, 'body.success')
    if (success !== true) {
      logger.error('Google recaptcha errors', response.body['error-codes'])
      throw new Error(response.body['error-codes'])
    }
    logger.debug('Google recaptcha success', {success})
    return success
  })
}
