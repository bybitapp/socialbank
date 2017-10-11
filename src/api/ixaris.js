import axios from 'axios'

export default {
  login: (values, cb) => {
    axios.post(window.OPC_API_HOST + '/98544057818742784/sessions', values)
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  },
  logout: (cb) => {
    axios.delete(window.OPC_API_HOST + '/98544057818742784/sessions')
      .then((res) => cb(null, res.data))
      .catch((e) => cb(e))
  }
}
