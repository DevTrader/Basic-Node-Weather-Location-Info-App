const request = require('request');


let getWeather = (lat, long, callback) => {
	request({
				url: `https://api.darksky.net/forecast/88a3d7c85c0c7b929e4e012d4c35f094/${lat},${long}`,
				json: true
			}, (error, response, body) => {

				function toCelsius(temp){
					let c;
					c = ((temp - 32)*5/9);
					return c.toFixed(2);
				};

					if (error){
						callback('Could not connect to Dark Sky API.');
					}else if (response.statusCode === 400){
						callback('Unable to fetch weather.');
					}else if (response.statusCode === 200){
						callback(undefined, {
							temperature: body.currently.temperature,
							apparentTemperature: body.currently.apparentTemperature,
							temperatureC: toCelsius(body.currently.temperature),
							apparentTemperatureC: toCelsius(body.currently.apparentTemperature)
						});
							
					}
				
				}
	);
}

module.exports.getWeather = getWeather;