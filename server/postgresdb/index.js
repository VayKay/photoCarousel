const { Pool } = require('pg');

const pool = new Pool({
  user: 'crischin',
  host: 'localhost',
  database: 'gallery',
  password: ''
});

// pool.connect();

let photos = "CREATE TABLE IF NOT EXISTS photos (id SERIAL PRIMARY KEY, listing_id INTEGER NOT NULL, url TEXT NOT NULL, tinyurl TEXT NOT NULL, caption TEXT NOT NULL, priority INTEGER)";
let listings = "CREATE TABLE IF NOT EXISTS listings (id SERIAL PRIMARY KEY)";

pool.query(photos, (err, res) => {
  if (err) {
    console.log(err);
  }
});

pool.query(listings, (err, res) => {
  if (err) {
    console.log(err);
  }
});

// pool.end();

module.exports.pool = pool;
module.exports.photos = photos;
module.exports.listings = listings;