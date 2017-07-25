const pgp = require('pg-promise')();
const connectionString = "postgres://douglaslubaway@localhost:5432/users";

const db = pgp(connectionString);

function insertUsers(email, password, callback) {
  return db.one((`
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *;
  `), [email, password], callback);
}

module.exports = {
  insertUsers,
  db
};
