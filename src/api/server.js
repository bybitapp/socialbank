import axios from 'axios'

// const projects = [
//   {name: 'test01', id: 1496075682278, balance:{actual:0}, created: 1496075682278},
//   {name: 'test02', id: 1496075682278, balance:{actual:0}, created: 1496075682278}
// ]
//
// const account = {email: 'james.smith@socialbank.co', password: 'password'}

export default {
  registerAccount: (values, cb) => {
      // return cb(null, project)
      axios.post('/api/account/register', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  login: (values, cb) => {
      // return cb(null, account)
      axios.post('/api/account/login', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  getProjects: (cb) => {
      // return cb(null, projects)
      axios.get('/api/project/list')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  addProject: (values, cb) => {
    //   return cb(null, project)
      axios.post('/api/project/add', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  addCard: (values, cb) => {
    //   return cb(null, project)
      axios.post('/api/card/add', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  getCards: (projectId, cb) => {
    axios.get(`/api/card/list/project/${projectId}`)
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  }
}
