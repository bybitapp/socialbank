import axios from 'axios'

export default {
  login: (values, cb) => {
    axios.post(window.OPC_API_HOST + '/sessions', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  logout: (cb) => {
    axios.delete(window.OPC_API_HOST + '/sessions')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  }
}
