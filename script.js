var humidity,
  pressure,
  temperature,
  windSpeed,
  object,
  weatherSummery;

var element = function (id) {
  return document.getElementById(id);
}

window.onload = function () {
  humidity = element('current-humidity');
  pressure = element('current-pressure');
  temperature = element('current-temperature');
  windSpeed = element('current-wind-speed');
  weatherSummery = element('weather-summary');
};

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      showWeather(lat, long);
    })
  }
}

function showWeather(lat, long) {
  var url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
  displayWeather();
}

function displayWeather(object) {
  humidity.innerHTML = 'Humidity: ' + humidityPercentage(object.currently.humidity) + '%';
  pressure.innerHTML = 'Pressure: ' + object.currently.pressure + 'mb';
  temperature.innerHTML = 'Temperature: ' + farenheitToCelsium(object.currently.temperature) + 'C' + '/' + object.current.temperature;
  windSpeed.innerHTML = 'Wind Speed: ' + knotsToKilometers(object.currently.windspeed) + 'km/h';
  weatherSummery.innerHTML = '' + object.timezone;
  document.getElementById('weather-summary').style.backgroundColor = darkblue;
}

function humidityPercentage(k) {
  return Math.round(k * 100);
}

function farenheitToCelsium(k) {
  return Math.round((k - 32) * 0.0556);
}

function knotsToKilometers(k) {
  return Math.round(k * 1.852);
}
