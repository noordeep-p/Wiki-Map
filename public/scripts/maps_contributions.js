/* eslint-disable no-undef */

// Frontend JS for maps contributions

$(() => {
  // Make ajax request for maps data and use a promise chain to async pass data to CreateMapListing
  // function and prepend returned listing to maps contributions

  const addMapsToIndex = () => {
    getCurrentUser().then(userData => {
      contributedMapsByUserId(userData.user.id).then(mapData=> {
        mapData.maps.forEach(map => {
          pointsByMapId(map.id).then(pointData => {
            const $map = CreateMapListing(map, userData, pointData);
            $('.map-listings').prepend($map);
          }).catch(e => console.log(e));
        });
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  };

  // function to make HTML markup of forms display

  const CreateMapListing = (mapData, userData, pointData) => {
    const titleArr = [];
    pointData.points.forEach(point => {
      titleArr.push(`<li>${point.title}</li>`);
    });

    return $map = $(`
    <article id="${mapData.id}" class="map-listing">
      <section class="map-listing__preview-image">
        <img src="${mapData.image_url}" alt="Map Preview Image">
      </section>
      <section class="map-listing__details">
        <h3 class="map-listing__title">${mapData.name}</h3>
        <ul class="map-listing__details">
          <lh>${mapData.description}</lh>
          ${titleArr.join('')}
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
