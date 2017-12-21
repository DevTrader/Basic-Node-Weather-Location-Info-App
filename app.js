const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let address, lat, long;

// Fetch Lat and long, then get weather.
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    errorMessage ? console.log(errorMessage) :
        console.log(results.address);
        //console.log(results.encondedAddress);
    lat = results.latitude;
    long = results.longitude;

    weather.getWeather(lat, long, (errorMessage, weatherResults) => {
        errorMessage ? console.log(errorMessage) : console.log(`It is ${weatherResults.temperature} F (${weatherResults.temperatureC} C), but it feels like ${weatherResults.apparentTemperature} F (${weatherResults.apparentTemperatureC} C) in ${results.address}`);
    });

});