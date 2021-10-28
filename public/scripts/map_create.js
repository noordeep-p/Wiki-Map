/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable no-undef */


//Initialize callbacks for google maps api scripts
function initialize() {
  initMap();
  initAutocomplete();
}

let map, marker, geolocation;


function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
      map.setBounds(circle.getBounds());
    });
  }
}

function initMap() {
  console.log(geolocate());
  let mapOptions = {
    center: {lat:43.6542651,lng:-79.7503345},
    zoom: 10,
  };

  // set map variable to new google map object
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // get all markers from backed server and add then to the map
  const addPointsByMapId = (mapId) => {
    pointsByMapId(mapId).then(pointData => {
      pointData.points.forEach(point => {
        // add point
        let marker = new
        google.maps.Marker({
          position: {lat: parseFloat(point.latitude), lng: parseFloat(point.longitude)},
          map: map
        });

        // add point pop window with HTML markup
        let infoWindow = new google.maps.InfoWindow(
          {content: `<h1>${point.title}</h2>
          <p>${point.description}</p>
          <img src="${point.image_url}" alt= "Place Image" width="250" height="250">`,
          });

        // add click listener to point to display popup when clicked
        marker.addListener('click', function() {
          infoWindow.open(map, marker);

        });
      });
    });
  };

  addPointsByMapId(1);

}


// create autocomplete search box for users to search for points to add
function initAutocomplete() {

  function fillInAddress() {
    // Get the place details from form input & send it to the backend server/ add pin to current map
    let place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    if (!marker) {
      marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });
    } else marker.setMap(null);
    marker.setOptions({
      position: place.geometry.location,
      map: map
    });
  }

  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}



geolocate();
