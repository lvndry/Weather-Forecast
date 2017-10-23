var url = "https://fcc-weather-api.glitch.me/api/current?";
var infos = {
  coordonees: {},
};

$(document).ready(function() {
  if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position.coords);
        infos.coordonees.long = position.coords.longitude;
        infos.coordonees.lat = (position.coords.latitude);
        getWeather(infos.coordonees);
        //console.log('geolocation: ' + infos.cityName);
        printInfos();
      }, geolocalError);
    }
    else geolocalError();
    //console.log('After else : ' + infos.cityName);
});

var geolocalError = function(){
  $("main").append('No weather information.');
};

function addInfos(key, value){
  infos[key] = value;
}
function printInfos(){
  //console.log('printInfos: ' + infos.coordonees.long);
}

function changeUnit(){
  //console.log(className);
  //console.log($("#unit").attr('class'));
  if($("#unit").attr('class') === 'celsius'){
    $("#unit").attr('class', 'faren');
    $("#unit").html('F');
    infos.temp = infos.temp * 9/5 + 32;
    $("#value").html((infos.temp).toFixed(2));
  }
  else {
    $("#unit").attr('class', 'celsius');
    $("#unit").html('C');
    infos.temp = (infos.temp - 32) * 5/9;
    $("#value").html((infos.temp).toFixed(2));
  }
}

function getWeather(position){
  infos.coordonees = position; //I can also reeuse coordonees whenenever I want

  url += 'lat=' + infos.coordonees.lat + '&'
  url += 'lon=' + infos.coordonees.long;

  $.getJSON(url, function(data){
      addInfos('temp', data.main.temp);
      addInfos('desc', data.weather[0].description);
      addInfos('icon', data.weather[0].icon);

      if($("#unit").hasClass('celsius')){
        $("#value").html(infos.temp);
        $("#unit").html('C');
      }
      else {
        infos.temp = infos.temp * 9/5 + 32;
        $("#value").html(infos.temp);
        $("#unit").html('F');
      }

  }, 'jsonp');
  infos.cityName = getCitnyName();
  //console.log('getCitnyNameReturn: ' + infos.cityName);
  printInfos();
}

function getCitnyName(){
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
      url += infos.coordonees.lat + ',' + infos.coordonees.long;
      url += '&key=AIzaSyBZyrHDEsYdhjvj5YaNvl3ZfBR74txfV3o';
      var cityN;

      $.getJSON(url, function(position){
        var results = position.results[0];
        var addr_components = results.address_components;
        var city = addr_components[2];
        cityN =  city.long_name;
        addInfos('cityName', city.long_name);
        $("#cityName").html(infos.cityName);
      })
}
