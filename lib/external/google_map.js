const config = require('config')
const maps = require('@google/maps')

const { mapKey } = config.google

const googleMapsClient = maps.createClient({key: mapKey})

exports.geocode = function geocode (address, postcode, city) {
  const search = address + ', ' + postcode + ', ' + city
  return new Promise((resolve, reject) => {
    googleMapsClient.geocode({address: search},
      function(err, response) {
        if (!err) {
          resolve(response.json.results)
        } else {
          console.log('errors', err)
          reject(err)
        }
      })
    }
  )

}
