/* eslint-disable no-undef */
// all JS to be includes in entire file

$(() => {
  $(document).on('click', '.favorite-button', function() {
    const mapId = $(this).attr('id').substring(13);
    getCurrentUser().then(userData => {
      let userId = userData.user.id;
      addMapToFavorites({mapId, userId}).then(res => {
        if (res) {
          alert("Map Successfully Added to Favorites!");
        }
      });
    });
  });

  $(document).on('click', '.edit-button', function() {
    const mapId = $(this).attr('id').substring(9);
    let url = `http://localhost:8080/maps/display/${mapId}`;
    $(location).attr('href',url);
  });

  $(document).on('click', '.point-delete-button', function() {
    const pointId = $(this).attr('id').substring(6);
    removePointFromMap({ pointId }).then(res => {
      if (res) {
        location.reload();
      }
    });
  });
});
