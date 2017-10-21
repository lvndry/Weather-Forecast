var url = "https://fcc-weather-api.glitch.me/api/current?";
var infos = {
  coordonees: {},
  temp: 0
};

$(document).ready(function() {
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        infos.coordonees.longitude = Math.floor(position.coords.longitude);
        infos.coordonees.latitude = Math.floor(position.coords.latitude);
        getWeather(infos.coordonees);
      });
      //@TODO: WHY I URL AND COORDONEES AREN'T MODIFIED HERE (because of anonymous function ?)
      //console.log(url);
      //console.log(coordonees);
  }
});

function getWeather(position){
  infos.coordonees = position; //I can also reeuse coordonees whenenever I want

  url += 'lat=' + infos.coordonees.latitude + '&'
  url += 'lon=' + infos.coordonees.longitude;

  $.getJSON(url, function(data){
      infos.temp = data.main.temp;
      infos.desc = data.weather.description;
      infos.icon = data.weather[0].icon;
      $("main").append(infos.temp);
  }, 'jsonp');
}
