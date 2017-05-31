import moment from 'moment'

exports.dateFormat = function (timestamp) {
  let date = moment.unix(Math.floor((Number(timestamp/1000))))
  return date.format('DD.MM.YYYY HH:mm:ss')
}
