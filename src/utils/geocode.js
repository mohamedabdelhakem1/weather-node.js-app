const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoibW9oYW1lZGFiZGVsaGFrZW00NzYiLCJhIjoiY2p5eGhneTN5MTdoODNtcnJpOXdzaWY2ZCJ9.JdPwfihHHXdPmmniBF6UGA'
    request({ url: geocodeURL, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0]
                , latitude: body.features[0].center[1]
                , location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode