$(document).ready(function(){
    function loadData(){
        let cityStr = $('#city').val();
        let originCity = "Saint-Gaudens";
        /* let lat;
        let lng; */

        //Meteo API
        let openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityStr + '&appid=0badf8c3c6810ca74edd69e529c2bcf8';
        $.getJSON(openWeatherUrl, function(data){
            $('.meteo-container').append('<p id="meteo-temperature">' + (data.main.temp - 273.15) + '°C</p>');
        });

        //Coordinates API
        let googleGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + cityStr;
        $.getJSON(googleGeocodingUrl, function(data){
            let cityLocation = data.results["0"].geometry.location;
           /*  lat = cityLocation.lat;
            lng = cityLocation.lng; */
            $('.address-container').append('<p id="address">Latitude: ' + cityLocation.lat + '.</br>Longitude: ' + cityLocation.lng + '.</p>');
        });

        //Time API
        /* let googleTimeUrl = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=1331161200&key=AIzaSyBk5ulp9QzGNGdEA0f5R3hHkJ9KFRkTmh8';
        $.getJSON(googleTimeUrl, function(data){
            console.log(data);
            let cityTime = data.;
            $('.time-container').append('<p id="time">' + cityTime + '</p>');
        }); */

        //Distance from St-Gaudens API
        let distanceMatrixUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Saint-Gaudens,FR&destinations=' + cityStr + 'key=AIzaSyBk5ulp9QzGNGdEA0f5R3hHkJ9KFRkTmh8';
        $.getJSON(distanceMatrixUrl, function(data){
            $('.distance-container').append('<p id="distance">The distance between ' + originCity + ' and ' + cityStr + ' is ' +  data.rows.elements.distance.text + 
                                            '. To get to ' + cityStr + ' from ' + originCity + 'by car will take ' + data.rows.elements.duration.text + '.</p>');
        });

        //Google Street View API
        let googleStreetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + cityStr;
        $('body').append('<img class="bg-image" src="' + googleStreetViewUrl + '" />');

        return false;
    };

    $('#form-container').submit(loadData);
});