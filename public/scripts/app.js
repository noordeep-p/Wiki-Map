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
});
