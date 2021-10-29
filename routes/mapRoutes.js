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
   * ALL EXPRESS SERVER MAP ROUTES
   */

  router.get("/display/:mapId", (req, res) => {
    let user = req.session.user;
    let mapId = req.params.mapId;
    if (user) {
      return res.render("map_edit", {mapId, user});
    }
    return res.render("maps_index", { user: null });
  });

  router.get("/contributions", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_contributions", user);
    }
    return res.render("maps_index", { user: null });
  });

  router.get("/favorites", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_favorites", user);
    }
    return res.render("maps_index", { user: null });
  });

  router.get("/create", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_new", user);
    }
    return res.render("maps_index", { user: null });
  });

  router.post("/create", (req, res) => {
    let userInfo = req.session.user;
    let userId = userInfo.user.id;
    let { name , description, image } = req.body;
    let query = `INSERT INTO maps (user_id, name, description, image_url) VALUES ($1,$2,$3,$4) RETURNING *`;
    if (userInfo) {
      return db.query(query, [userId,name,description,image])
        .then(data => {
          if (data) {
            let user = userInfo;
            let mapId = data.rows[0].id;
            return res.render("map_edit", { user, mapId });
          }
        }).then(
        )
        .catch(e => console.log(e));
    }
    return res.render("maps_index", { user: null });
  });

  router.get("/", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_index", user);
    }
    return res.render("maps_index", { user: null });
  });

  return router;
};
