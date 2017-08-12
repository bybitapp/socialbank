const got = require('got')

const errors = require('lib/errors')
const logger = require('lib/logger')
const config = require('config')

module.exports = function captchaMiddlewareGenerator (useCaptcha) {
  return async function captchaMiddleware (req, res, next) {
    if (!useCaptcha || !config.captcha.enabled) {
      next()
    } else {
      const captchaKey = 'req.body.captcha'
      if (captchaKey) {
        try {
          const response = await got('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: {
              secret: config.captcha.secretKey,
              response: captchaKey
            }
          })

          if (response.body.success === true) {
            next()
          }

          logger.error('Google recaptcha errors', response.body['error-codes'])
          throw new Error(response.body['error-codes'])
        } catch (e) {
          const error = new errors.ValidationError('Incorrect captcha key', {
            captchaKey: {
              invalid: 'Captcha key was invalid'
            }
          })
          next(error)
        }
      } else {
        const error = new errors.ValidationError('No captcha key given', {
          captchaKey: {
            invalid: 'No captcha key given'
          }
        })
        next(error)
      }
    }
  }
}
