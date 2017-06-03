require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')

const config = require('./config');
const middleware = require('server/middleware');

const server = express()

server.enable("trust proxy");

server.use(middleware.ensureHttps());
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('./build'));

// Insert routes below
server.use('/api/account',      require('server/routes/api/accounts/routes'));
server.use('/api/project',      require('server/routes/api/projects/routes'));
server.use('/api/card',         require('server/routes/api/cards/routes'));

server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

server.listen(config.general.port, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:' + config.general.port)
})
