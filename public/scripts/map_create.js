/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable no-undef */

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(2.8, -187.3),
    mapTypeId: "terrain",
  });
}
