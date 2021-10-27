/* eslint-disable no-undef */
// All frontend ajax requests

const getAllMaps = () => {
  return $.ajax({
    url: "/api/maps"
  });
};

const getCurrentUser = () => {
  return $.ajax({
    url: "/api/currentUser"
  });
};
