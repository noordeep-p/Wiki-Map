/* eslint-disable no-undef */

// Frontend JS for maps favorites

$(() => {
  // Make ajax request for maps data and use a promise chain to async pass data to CreateMapListing
  // function and prepend returned listing to maps favorites

  const addMapsToIndex = () => {
    getCurrentUser().then(userData => {
      favoriteMapsByUserId(userData.user.id).then(mapData=> {
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
    <article id="${mapData.id}" class="map-listing">
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
        ${userData.user ? `<button id="edit-map-${mapData.id}" class="edit-button">Edit</button>
          <button id="favorite-map-${mapData.id}" class="favorite-button">Favorite</button>` : ``}
        </footer>
      </section>
    </article>
    `);
  };

  addMapsToIndex();

});
