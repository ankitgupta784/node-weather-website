const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = 'http://api.weatherapi.com/v1/current.json?key=c1a7d70bd8fe456ab4c124733243105&q=' + address + '&aqi=yes';

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            const latitude = response.body.location.lat
            const longitude = response.body.location.lon
            callback(undefined, {latitude, longitude})
        }
    })
}

module.exports = geocode