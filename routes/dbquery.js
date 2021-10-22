const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

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
exports.getUserByEmail = getUserByEmail;

const login = (email, password) => {
  let validateUser;
  return db.getUserByEmail(email)
    .then(user => {
      user.password === password ? validateUser = user : validateUser = null;
      return validateUser;
    })
    .catch(e => console.log(e));
};
exports.login = login;

/**
   * Add a new user to the database
   * @param {{name: string, email: string, password:string}}
   * @return {Promise<{}>} to the user
   */


