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

  // get all markers from backed server and add then to the map
  const addPointsByMapId = (mapId) => {
    pointsByMapId(mapId).then(pointData => {
      pointData.points.forEach(point => {
        // add point
        let marker = new
        google.maps.Marker({
          position: {lat: parseFloat(point.latitude), lng: parseFloat(point.longitude)},
          map: newMap
        });

        // add point pop window with HTML markup
        let infoWindow = new google.maps.InfoWindow(
          {content: `<h1>${point.title}</h2>
          <p>${point.description}</p>
          <img src="${point.image_url}" alt= "Place Image" width="250" height="250">`,
          });

        // add click listener to point to display popup when clicked
        marker.addListener('click', function() {
          infoWindow.open(newMap, marker);

        });
      });
    });
  };

  addPointsByMapId(1);

}
