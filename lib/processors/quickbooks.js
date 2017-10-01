const querystring = require('querystring')
const Bluebird = require('bluebird')

const quickbooks = require('external/quickbooks')

exports.callback = function (req, res) {
  const oauth = {
    consumer_key: quickbooks.constants.consumerKey,
    consumer_secret: quickbooks.constants.consumerSecret,
    token: req.query.oauth_token,
    token_secret: req.session.oauth_token_secret,
    verifier: req.query.oauth_verifier,
    realmId: req.query.realmId
  }

  quickbooks.callback(oauth, (data) => {
    const accessToken = querystring.parse(data)

    req.session.qbo = {
      token: accessToken.oauth_token,
      secret: accessToken.oauth_token_secret,
      companyid: oauth.realmId
    }
    const qbo = quickbooks.getQbo(req.session.qbo)

    const getOrgInfo = Bluebird.promisify(qbo.getOrg, { context: qbo })
    getOrgInfo().then((response) => {
      res.redirect('/me')
    })
  })
}
