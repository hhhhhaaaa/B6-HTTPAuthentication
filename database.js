const pgp = require('pg-promise')();
const connectionString = "postgres://douglaslubaway@localhost:5432/users";

const db = pgp(connectionString);

function insertContacts(email, password, callback) {
  db.query(`
    INSERT
    INTO users
    VALUES ($1, $2)
  `), [email, password], callback;
}

module.exports = {
  insertContacts,
  db
};
