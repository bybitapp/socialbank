require('dotenv').config()

const express = require('express')
const path = require('path');
const config = require('./config');
const middleware = require('src/middleware');
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()

server.enable("trust proxy");

server.use(middleware.ensureHttps());
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('./build'));

// Insert routes below
server.use('/api/account',      require('./server/account'));
server.use('/api/project',      require('./server/project'));
server.use('/api/card',         require('./server/card'));

server.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

server.listen(config.general.port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + config.general.port)
})
