const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=c1a7d70bd8fe456ab4c124733243105&q=' + latitude + ',' + longitude + '&aqi=n';

    request({ url: url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined);
        }else if (response.body.error) {
            callback('Unable to find location',undefined);
        } else {
            //console.log(response.body.current.condition.text);
            callback(undefined, response.body.location.name+ " is currently " + response.body.current.temp_c + " degrees out. There is a " + response.body.current.precip_mm + "% chance of rain.");
        }
    })
}

module.exports = forecast