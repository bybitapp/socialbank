const truthy = require('lib/util/truthy')

const config = {
  app: {
    port: process.env.PORT || 3001,
    name: process.env.APP_NAME || 'sotec',
    url: process.env.APP_URL || 'http://www.sotec.io'
  },
  support: {
    email: 'contact@sotec.io',
    name: 'SoTec Team'
  },
  returnStackTrace: truthy(process.env.RETURN_STACK_TRACE, false),
  ensureHttps: truthy(process.env.ENSURE_HTTPS, false),
  mongoUrl: process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/sotec-dev',
  session: {
    secret: process.env.SESSION_SECRET || 'eda4b6e5027ab1c709d2153b6c8ef347',
    cookie: {
      secure: truthy(process.env.COOKIE_SECURE, false)
    }
  },
  opc: {
    urlApi: 'https://app-gateway.openpayments.cloud/api',
    programmeKey: '98246298932019200|98250555867660288',
    programmeId: '98250555867660288',
    username: 'sotec',
    password: '8Lx3WSn^',
    ownerId: '98254531595468800',
    currency: 'GBP',
    country: 'GB',
    issueProvider: 'Card Issuing Provider',
    profile: {
      corporateIdentity: '98250602558455808',
      managedCard: '98250598277840896',
      managedAccount: '98250559850283008',
      externalAccount: '98250601775235072',
      withdraw: '98250600938602496',
      deposit: '98250600097579008',
      transfer: '98250557307617280'
    }
  },
  google: {
    mapKey: 'AIzaSyCkwfHICB6QowBNjiGBZc12MH2HbdZnHbM'
  },
  mailchimp: {
    apiKey: 'c131f7446208bc5bc5a01d6375b5b76d-us16',
    mailingListId: '858c427a82'
  },
  smtp: {
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@sotec.io',
      pass: 'sotec123456!'
    }
  }
}

module.exports = config
