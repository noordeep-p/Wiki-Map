/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable no-undef */

// hide pin info box on load
$(() => {
  $('#pin-parameters').slideUp();
  // Make ajax request for maps data and use a promise chain to async pass data to CreateMapListing
  // function and prepend returned listing to maps contributions
  const mapId = $('.current-mapId').attr('id').substring(14);

  const addPointsToPage = (mapId) => {

    pointsByMapId(mapId).then(pointData => {
      pointData.points.forEach(point => {
        $point = CreatePointListings(point);
        $('#points-list').prepend($point);
      });
    }).catch(e => console.log(e));


    // function to make HTML markup of forms display

    const CreatePointListings = (point) => {
      return $point = $(`
    <article id="${point.id}" class="point-listing">
      <section class="map-listing__preview-image">
        <img src="${point.image_url}" alt="Map Preview Image" id="point-img">
      </section>
      <section class="map-listing__details">
        <h3 class="map-listing__title">${point.title}</h3>
        <ul class="map-listing__details">
          <lh>${point.description}</lh>
          <li>${point.address}</li>
        </ul>
        <footer class="map-listing__footer">
        <button id="point-${point.id}" class="point-delete-button">Remove</button>
        </footer>
      </section>
    </article>
    `);
    };
  };

  addPointsToPage(mapId);
});

//Initialize callbacks for google maps api scripts
function initialize() {
  initMap();
  initAutocomplete();
}

// initialize map variables
let map, marker;

// geo locate user based using the build in browser geolocation, set search bounds
// and map center to geolocation after map is initialized
function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
      map.setCenter(geolocation);
    });
  } else {
    // set default geolocation to toronto if navigator geolocation is not present
    map.setCenter({lat:43.6542651,lng:-79.7503345});
  }
}

// set search bounds for new map
function setSearchBounds() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

// initialize map options and map
function initMap() {
  let mapOptions = {
    zoom: 10,
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // get all markers from backed server and add then to the map
  const addPointsByMapId = (mapId) => {
    pointsByMapId(mapId).then(pointData => {
      // if no points are returned then switch user view to their geolocation
      if (!pointData.points.point) {
        geolocation();
      }
      pointData.points.forEach(point => {
        // add point
        let marker = new
        google.maps.Marker({
          position: {lat: parseFloat(point.latitude), lng: parseFloat(point.longitude)},
          map: map
        });
        // recenter map over latest point
        map.setCenter({lat: parseFloat(point.latitude), lng: parseFloat(point.longitude)});
        map.setZoom(11);
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
  // get current mapId to get points
  const mapId = $('.current-mapId').attr('id').substring(14);
  addPointsByMapId(mapId);
}


// create autocomplete search box for users to search for points to add
function initAutocomplete() {

  function fillInAddress() {
    $('#pin-parameters').slideDown("slow");

    // Get the place details from google autocomplete API
    let place = autocomplete.getPlace();

    // Get all place values on pin it button click and post values to server
    $("#pin-it-button").click(function() {
      let description = $("#pin-description").val();
      let imageURL = $("#pin-image").val();
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      let name = place.name;
      let address = place.formatted_address;
      let mapId = $('.current-mapId').attr('id').substring(14);
      const pointData = { mapId, description, imageURL, lat, lng, name, address };
      addPointToMap(pointData).then(res => {
        if (res) {
          location.reload();
        }
      }).catch(e => console.log(e));
    });

    // center map to user search result pin and add pin
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
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
      types: ['establishment']
    });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

setSearchBounds();
