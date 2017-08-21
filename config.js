const truthy = require('lib/util/truthy')

const port = process.env.PORT || 3001
const config = {
  app: {
    port,
    name: process.env.APP_NAME || 'sotec',
    url: process.env.APP_URL || `http://localhost:${port}`
  },
  support: {
    email: 'contact@sotec.io',
    name: 'SoTec Team'
  },
  returnStackTrace: truthy(process.env.RETURN_STACK_TRACE, false),
  ensureHttps: truthy(process.env.ENSURE_HTTPS, false),
  mongoUrl: process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/sotec-dev',
  session: {
    name: 'SBSID',
    secret: process.env.SESSION_SECRET || 'eda4b6e5027ab1c709d2153b6c8ef347',
    cookie: {
      secure: truthy(process.env.COOKIE_SECURE, false),
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      maxAge: 1000 * 60 * 15 // 15 mins
    }
  },
  opc: {
    urlApi: 'https://app-gateway.stg.openpayments.cloud/api',
    programmeKey: '98505513021865984|98520768000622592',
    programmeId: '98520768000622592',
    username: 'sotec',
    password: '8Lx3WSn^',
    ownerId: '98520951317331968',
    currency: 'GBP',
    country: 'GB',
    issuingProvider: 'idt',
    processingProvider: 'gps',
    profile: {
      corporateIdentity: '98520784525459456',
      managedCard: '98520775159840768',
      managedAccount: '98520777109274624',
      externalAccount: '98520779001757696',
      withdraw: '98520782683176960',
      deposit: '98520778166566912',
      transfer: '98520768619937792'
    }
  },
  google: {
    mapKey: 'AIzaSyCkwfHICB6QowBNjiGBZc12MH2HbdZnHbM'
  },
  mailchimp: {
    apiKey: 'c131f7446208bc5bc5a01d6375b5b76d-us16',
    mailingListId: '858c427a82'
  },
  mailgun: {
    apiKey: 'key-1b7814c2dcd4f31c4c5302368bde1a67',
    domain: 'mg.sotec.io'
  },
  captcha: {
    secretKey: process.env.CAPTCHA_SECRET_KEY || '6LezpywUAAAAAEGVwkC67SQHmlGCOydrecHod7uk',
    enabled: truthy(process.env.CAPTCHA_ENABLED, true)
  }
}

module.exports = config
