/* eslint-disable no-undef */

// Client facing scripts here

// All ajax requests (separate into network.js file later)
const getAllMaps = () => {
  return $.ajax({
    url: "/api/maps"
  });
};

const getMyDetails = () => {
  return $.ajax({
    url: "/api/me"
  });
};

$(() => {
  // Make ajax request for maps data and use a promise chain to async pass data to CreateMapListing
  // function and prepend returned listing to maps index

  const addMapsToIndex = () => {
    getAllMaps().then(mapData => {
      getMyDetails().then(userData => {
        mapData.maps.forEach(map => {
          const $map = CreateMapListing(map, userData);
          $('.map-listings').prepend($map);
        });
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  };

  // Create function to make HTML markup of forms display

  const CreateMapListing = (mapData, userData) => {
    return $map = $(`
    <article class="map-listing">
      <section class="map-listing__preview-image">
        <img src="${mapData.image_url}" alt="Map Preview Image">
      </section>
      <section class="map-listing__details">
        <h3 class="map-listing__title">${mapData.name}</h3>
        <ul class="map-listing__details">
          <lh>${mapData.description}</lh>
          <li>PLACEHOLDER FOR ADDING MAP POINT TITLE</li>
          <li>PLACEHOLDER FOR ADDING MAP POINT TITLE</li>
          <li>PLACEHOLDER FOR ADDING MAP POINT TITLE</li>
        </ul>
        <footer class="map-listing__footer">
        ${userData.user ? `<button button id="edit-map-${mapData.id}" class="edit-button">Edit</button>
          <button button id="favorite-map-${mapData.id}" class="favorite-button">Favorite</button>` : ``}
        </footer>
      </section>
    </article>
    `);
  };

  addMapsToIndex();

});
