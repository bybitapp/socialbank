const QuickBooks = require('node-quickbooks')
const querystring = require('querystring')
const request = require('request')

const config = require('config')

const consumerKey = config.quickbooks.consumerKey
const consumerSecret = config.quickbooks.consumerSecret

exports.constants = {
  appCenterUrl: QuickBooks.APP_CENTER_URL,
  consumerKey,
  consumerSecret
}

exports.requestToken = function (oauth, cb) {
  const postBody = {
    url: QuickBooks.REQUEST_TOKEN_URL,
    oauth
  }
  request.post(postBody, (e, r, data) => {
    cb(data)
  })
}

exports.callback = function (oauth, cb) {
  const postBody = {
    url: QuickBooks.ACCESS_TOKEN_URL,
    oauth
  }
  request.post(postBody, (e, r, data) => {
    cb(data)
  })
}

exports.getQbo = function (args) {
  return new QuickBooks(consumerKey,
    consumerSecret,
    args.token,
    args.secret,
    args.companyid,
    true, // use the Sandbox
    true) // turn debugging on
}

exports.connect = function (req, res) {
  const oauth = {
    callback: `${config.app.url}/auth/quickbooks/callback/`,
    consumer_key: this.constants.consumerKey,
    consumer_secret: this.constants.consumerSecret
  }
  this.requestToken(oauth, (data) => {
    const requestToken = querystring.parse(data)
    req.session.oauth_token_secret = requestToken.oauth_token_secret
    res.redirect(this.constants.appCenterUrl + requestToken.oauth_token)
  })
}
