import axios from 'axios'

export default {
  getProjects: (cb) => {
    //   return cb(null, projects)
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
  getCards: (cb) => {
    axios.get('/api/cards')
    .then((res) => cb(null, res.data))
    .catch((e) => cb(e))
  }
}
