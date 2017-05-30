const config = require('config');

module.exports = function () {
  return function ensureHttps (req, res, next) {
    if (config.app.ensureHttps && !(req.protocol === "https" || req.headers["x-forwarded-proto"] === "https")) {
      const host = req.headers.host;
      if (host !== undefined) {
        res.redirect(`https://${host}${req.url}`);
      } else {
        res.status(400).send("Please use HTTPS.");
      }
    } else {
      next();
    }
  };
};
