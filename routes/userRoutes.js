/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // below are all db querying functions use them inside your routes
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
   * Below are all your routes that start with /user + the route
   * so the first route represents /user/login
   */




  // if you go to the login page and enter a password the info is submitted to this
  // route and if the user exist you'll see a console log of the user object if not
  // you'll see null

  router.post("/login", (req, res) => {
    login(req.body.email, req.body.password)
      .then(data => {
        console.log(data);
        res.sendStatus(200);
      })
      .catch(e => console.log(e));
  });


  // Create a new user
  router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    getUserByEmail(email)
      .then(data => {
        if (data) { //if user exists
          res.send("User already exists");
          return;
        }
        const newUser = {
          name, email, password
        };
        addUser(newUser)
          .then(user => {
            console.log('add in user', user);
            res.send('New user created!');
          })
          .catch(e => res.send(e));
      });
    return;

  });

  return router;
};
