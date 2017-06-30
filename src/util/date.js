import moment from 'moment'

export const dateFormat = timestamp => {
  let date = moment.unix(Math.floor((Number(timestamp / 1000))))
  return date.format('DD.MM.YYYY HH:mm:ss')
}
