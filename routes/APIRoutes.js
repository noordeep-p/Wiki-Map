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
   * ALL EXPRESS SERVER API ROUTES
   */

  router.get("/maps/points/:mapId", (req, res) => {
    const mapId = req.params.mapId;
    let query = `SELECT * FROM points WHERE map_id = $1`;
    db.query(query, [mapId])
      .then(data => {
        const points = data.rows;
        res.json({ points });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.delete("/maps/favorites", (req, res) => {
    const { userId, mapId } = req.body;

    let query = `DELETE FROM favorites WHERE user_id = $1 AND map_id = $2`;
    db.query(query, [userId, mapId])
      .then(data => {
        const removedFavorite = data.rows;
        res.json({ removedFavorite });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/maps/favorites", (req, res) => {
    const { userId, mapId } = req.body;

    let query = `INSERT INTO favorites (user_id, map_id) VALUES ($1,$2) RETURNING *`;
    db.query(query, [userId, mapId])
      .then(data => {
        const newFavorites = data.rows;
        res.json({ newFavorites });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/maps/favorites/:userId", (req, res) => {
    const userId = req.params.userId;
    let query = `SELECT * FROM maps JOIN favorites ON maps.id = map_id WHERE favorites.user_id = $1`;
    db.query(query, [userId])
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/maps/:userId", (req, res) => {
    const userId = req.params.userId;
    let query = `SELECT * FROM maps JOIN contributions ON maps.id = map_id WHERE contributions.user_id = $1`;
    db.query(query, [userId])
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/maps", (req, res) => {
    let query = `SELECT * FROM maps LIMIT $1`;
    db.query(query, [10])
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/currentUser", (req, res) => {
    const user = req.session.user;
    if (!user) {
      return res.send({user: null});
    }
    return res.json(user);
  });

  return router;
};
