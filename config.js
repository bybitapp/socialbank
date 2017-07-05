const truthy = require('lib/util/truthy')

const config = {
  app: {
    port: process.env.PORT || 3001,
    name: process.env.APP_NAME || 'sotec',
    url: process.env.APP_URL || 'http://www.sotec.io'
  },
  returnStackTrace: truthy(process.env.RETURN_STACK_TRACE, false),
  ensureHttps: truthy(process.env.ENSURE_HTTPS, false),
  mongoUrl: process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/sotec-dev',
  session: {
    secret: process.env.SESSION_SECRET || 'dummySecret',
    cookie: {
      secure: truthy(process.env.COOKIE_SECURE, false)
    }
  },
  opc: {
    urlApi: 'https://app-gateway.openpayments.cloud/api',
    programmeKey: 'team-01|957296499696862',
    programmeId: '957296499696862',
    username: 'team-01',
    password: '8Lx3WSn^',
    ownerId: '87593085012710413',
    currency: 'GBP',
    country: 'GB',
    issueProvider: 'Card Issuing Provider',
    profile: {
      corporateIdentity: '97593089101268736',
      managedCard: '97593089101269248',
      managedAccount: '97593089101268992',
      externalAccount: '97593089101269504',
      withdraw: '97593089101271040',
      deposit: '97593089101270016',
      transfer: '97593089101269760'
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
