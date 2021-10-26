/* eslint-disable no-undef */
// All frontend ajax requests

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
