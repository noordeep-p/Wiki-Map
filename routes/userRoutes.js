/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  /**
   * ALL DATABASE QUERYING FUNCTIONS
   */

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password
   */

  const getUserByEmail = (email) => {
    let user;
    const queryString = `SELECT * FROM users WHERE email = $1`;
    return db.query(queryString, [email])
      .then(res => {
        res.rows[0] ? user = res.rows[0] : user = null;
        return user;
      })
      .catch(e => console.log(e));
  };

  const login = (email, password) => {
    let validateUser;
    return getUserByEmail(email)
      .then(user => {
        user.password === password ? validateUser = user : validateUser = null;
        return validateUser;
      })
      .catch(e => console.log(e));
  };

  /**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

  const getUserById = (id) => {
    let user;
    const queryString = `SELECT * FROM users WHERE id = $1`;
    return db.query(queryString, [id])
      .then(res => {
        res.rows[0] ? user = res.rows[0] : user = null;
        return user;
      }).catch(e => console.log(e));
  };

  /**
   * Add a new user to the database
   * @param {{name: string, email: string, password:string}}
   * @return {Promise<{}>} to the user
   */

  const addUser = (user) => {
    const queryString = `INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *`;
    return db.query(queryString, [user.name, user.email, user.password])
      .then(res =>{
        return res.rows[0];
      })
      .catch(e => console.log(e));
  };

  /**
   * ALL EXPRESS SERVER USER ROUTES
   */

  // handle root directory server request
  router.get("/", (req, res) => {
    let user = req.session.user;
    if (user) {
      return res.render("maps_index", user);
    }
    return res.render("maps_index", { user: null });
  });

  // login user
  router.route("/login")
    .get((req, res) => {
      return res.render("login", { user: null });
    })
    .post((req, res) => {
      login(req.body.email, req.body.password)
        .then(user => {
          if (user) {
            req.session.user = { user };
            return res.render("maps_index", { user });
          }
          return res.sendStatus(400);
        })
        .catch(e => console.log(e));
    });


  // logout user
  router.post("/logout", (req, res) => {
    req.session = null;
    res.render("maps_index", { user: req.session });
  });

  // create a new user
  router.route('/register')
    .get((req, res) => {
      res.render("register",{ user: null });
    })
    .post((req, res) => {
      const { name, email, password } = req.body;
      getUserByEmail(email)
        .then(user => {
          if (user) {
            return res.send("User already exists");
          }
          const newUser = { name, email, password };
          addUser(newUser)
            .then(user => {
              if (user) {
                return res.send('New user created! Please <a href="/login">login</a>');
              }
            })
            .catch(e => res.send(e));
        });
      return;
    });

  return router;
};
