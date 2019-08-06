const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/a2958fd4b083d496f479d49678e68a27/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary )
        }
    })
}

module.exports = forecast