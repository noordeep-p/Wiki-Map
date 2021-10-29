/* eslint-disable no-undef */
// All frontend ajax requests

const getCurrentUser = () => {
  return $.ajax({
    url: "/api/currentUser"
  });
};

const getAllMaps = () => {
  return $.ajax({
    url: "/api/maps"
  });
};

const contributedMapsByUserId = (userId) => {
  return $.ajax({
    url: `/api/maps/${userId}`
  });
};

const favoriteMapsByUserId = (userId) => {
  return $.ajax({
    url: `/api/maps/favorites/${userId}`
  });
};

const pointsByMapId = (mapId) => {
  return $.ajax({
    url: `/api/maps/points/${mapId}`
  });
};

const addMapToFavorites = (data) => {
  return $.ajax({
    method: "POST",
    url: `/api/maps/favorites`,
    data
  });
};

const removeMapFromFavorites = (data) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/maps/favorites`,
    data
  });
};

const addPointToMap = (data) => {
  return $.ajax({
    method: "POST",
    url: `/api/maps/points`,
    data
  });
};

const removePointFromMap = (data) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/maps/points`,
    data
  });
};
