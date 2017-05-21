import axios from 'axios'

// TMP projects
const projects = [
    {id: 1, name: 'Human Rights Watch', description: '', funds: '£14.000', icon: 'functions', lat: 51.522, lng: -0.089},
    {id: 2, name: 'Do Something', description: '', funds: '£55.000', icon: 'person', lat: 51.52, lng: -0.08},
    {id: 3, name: 'World Wildlife Fund', description: '', funds: '£22.000', icon: 'star', lat: 51.52, lng: -0.082},
    {id: 4, name: 'Caritas', description: '', funds: '£5.000', icon: 'star', lat: 51.523, lng: -0.085}
];

const project = {id: 5, name: 'XXXX', description: '', funds: '£5.000', icon: 'star', lat: 51.523, lng: -0.085};

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
  }
}
