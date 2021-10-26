/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable no-undef */


function initMap() {

  let mapOptions = {
    center: {lat:43.651070,lng:-79.347015},
    zoom: 10,
  };

  // new map
  let newMap = new
  google.maps.Map(document.getElementById('map'), mapOptions);

  // add marker
  let marker = new
  google.maps.Marker({
    position: {lat: 43.6488, lng: -79.6870},
    map: newMap
  });

  // add popup window
  let infoWindow = new google.maps.InfoWindow(
    {content: "<h1>Ricks Good Eats</h1>",
    });

  marker.addListener('click', function() {
    infoWindow.open(newMap, marker);
  });

}
