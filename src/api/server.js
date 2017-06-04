import axios from 'axios'

// const projects = [
//   {name: 'test01', id: 1496075682278, balance:{actual:0}, created: 1496075682278},
//   {name: 'test02', id: 1496075682278, balance:{actual:0}, created: 1496075682278}
// ]
//
// const data = {account: {email: 'james.smith@socialbank.co', password: 'password', organization: {bankAccount:{owner: "James Smith"}}}, projects: []}

export default {
  registerAccount: (values, cb) => {
      // return cb(null, project)
      axios.post('/api/accounts/register', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  login: (values, cb) => {
      // return cb(null, data)
      axios.post('/api/accounts/login', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  getProjects: (cb) => {
      // return cb(null, projects)
      axios.get('/api/projects/list')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  addProject: (values, cb) => {
    //   return cb(null, project)
      axios.post('/api/projects/add', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  addCard: (values, cb) => {
    //   return cb(null, project)
      axios.post('/api/cards/add', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  getCards: (cb) => {
    axios.get('/api/cards/list')
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  }
}
