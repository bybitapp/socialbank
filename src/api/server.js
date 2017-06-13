import axios from 'axios'

export default {
  registerAccount: (values, cb) => {
    axios.post('/api/accounts/register', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  login: (values, cb) => {
    axios.post('/api/accounts/login', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  logout: (cb) => {
    axios.get('/api/accounts/logout')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  isLoggedIn: (cb) => {
    axios.get('/api/accounts/login')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  getOrganizations: (cb) => {
    axios.get('/api/organizations/list')
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  getOrganizationById: (oid, cb) => {
    axios.get(`/api/organizations/o/${oid}`)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  getProjects: (cb) => {
    axios.get('/api/projects/list')
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  addProject: (values, cb) => {
    axios.post('/api/projects/add', values)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  closeProject: (values, cb) => {
    axios.post('/api/projects/delete', values)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  depositProject: (values, cb) => {
    axios.post('/api/projects/deposit', values)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  addCard: (values, cb) => {
    axios.post('/api/cards/add', values)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  destroyCard: (values, cb) => {
      axios.post('/api/cards/delete', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  transferCard: (values, cb) => {
    axios.post('/api/cards/transfer', values)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  getCards: (projId, cb) => {
    axios.get(`/api/cards/list/p/${projId}`)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  getHistory: (projId, cb) => {
    axios.get(`/api/history/list/p/${projId}`)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  },
  sendMessage: (values, cb) => {
    axios.post('/api/contacts/send', values)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  }
}
