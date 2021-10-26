/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  /**
   * ALL DATABASE QUERYING FUNCTIONS
   */








  /**
   * ALL EXPRESS SERVER MAP ROUTES
   */

  router.get("/create", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_create", { user });
    }
    return res.render("maps_create", { user: null });
  });

  router.get("/", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_index", { user });
    }
    return res.render("maps_index", { user: null });
  });

  return router;
};
