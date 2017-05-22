const express = require('express')
const config = require('./config/default');
const uuid = require('uuid/v1');
const path = require('path');

var Opc = require('open_payments_cloud_application_api');
Opc.ApiClient.instance.basePath = config.opc.urlApi;

const bodyParser = require('body-parser')
const cors = require('cors')

const { opc: { programmeKey, programmeId, username, password, managedAccountProfile, managedCardProfile, ownerId} } = config

const server = express()
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('./build'));

// get information about token
const getToken =() => {
  const api = new Opc.AuthApi();
  const request = new Opc.LoginParams(programmeId, username, password)
  return api.authLogin(uuid(), programmeKey, request)
}

// TEMPORARY: BEGIN
var projects = [
    {id: 1, name: 'Human Rights Watch', description: '', funds: '£14.000', icon: 'functions', lat: 51.522, lng: -0.089},
    {id: 2, name: 'Do Something', description: '', funds: '£55.000', icon: 'person', lat: 51.52, lng: -0.08},
    {id: 3, name: 'World Wildlife Fund', description: '', funds: '£22.000', icon: 'star', lat: 51.52, lng: -0.082},
    {id: 4, name: 'Caritas', description: '', funds: '£5.000', icon: 'star', lat: 51.523, lng: -0.085}
];
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// TEMPORARY: END

// create a request for funds
server.get('/api/projects', async (req, res) => {
  try {
      return res.send(projects);
  } catch (err) {
      console.error(err)
      return res.send(err)
  }
})

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// create a request for funds
server.post('/api/project', async (req, res) => {
  try {
      // TEMPORARY: BEGIN
      const project = {
          id: projects.length + 1,
          funds: '£0.00',
          icon: 'star',
          lat: '51.52' + getRandomInt(0,9),
          lng: '-0.082' + getRandomInt(0,9),
          name: req.body.name,
          description: req.body.description
      }
      projects.push(project);
      // TEMPORARY: END
      return res.send(project)
  } catch (err) {
      console.error(err)
      return res.send(err)
  }
})

server.listen(config.general.port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + config.general.port)
})
