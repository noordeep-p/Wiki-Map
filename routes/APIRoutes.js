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
   * ALL EXPRESS SERVER API ROUTES
   */

  router.get("/me", (req, res) => {
    const user = req.session.user;
    if (!user) {
      return res.send({user: null});
    }
    return res.json(user);
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

  return router;
};
