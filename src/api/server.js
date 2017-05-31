import axios from 'axios'

// const projects = [
//   {name: 'test01', id: 1496075682278, balance:{actual:0}, created: 1496075682278},
//   {name: 'test02', id: 1496075682278, balance:{actual:0}, created: 1496075682278}
// ]

export default {
  getProjects: (cb) => {
      // return cb(null, projects)
      axios.get('/api/projects')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  addProject: (values, cb) => {
    //   return cb(null, project)
      axios.post('/api/project', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  addCard: (values, cb) => {
    //   return cb(null, project)
      axios.post('/api/card', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  getCards: (cb) => {
    axios.get('/api/cards')
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  }
}
