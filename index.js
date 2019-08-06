require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
// const { Op } = require('sequelize');
// const db = require('./server/db/index.js');
const db = require('./server/postgresdb/index.js');


const app = express();
const port = 3002;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', expressStaticGzip(path.resolve(__dirname, './public/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.use('/photoCarousel/:listingID', expressStaticGzip(path.resolve(__dirname, './public/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.get('/api/listings/photos/initial/:listingID', (req, res) => {
  const { listingID } = req.params;

  db.query(`SELECT * FROM photos WHERE listing_id = ${listingID} AND priority < 5 ORDER BY priority ASC`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  })
});

app.get('/api/listings/photos/:listingID', (req, res) => {
  const { listingID } = req.params;

  db.query(`SELECT * FROM photos WHERE listing_id = ${listingID} AND priority > 4 ORDER BY priority ASC`, (err, results) => {
    if(err){
      console.log(err);
    }
    res.status(200).json(results.rows);
  })
});


app.get('/api/listings/photos/initial/:listingID', (req, res) => {
  const { listingID } = req.params;

  db.Photo.findAll({
    where: {
      listing_id: listingID,
      priority: {
        [Op.lte]: 4,
      },
    },
    order: [
      ['priority', 'ASC'],
    ],
  }).then(result => res.send(result))
    .catch(err => res.send(err));
});

app.get('/api/listings/photos/:listingID', (req, res) => {
  const { listingID } = req.params;

  db.Photo.findAll({
    where: {
      listing_id: listingID,
      priority: {
        [Op.gte]: 5,
      },
    },
    order: [
      ['priority', 'ASC'],
    ],
  }).then(result => res.send(result))
    .catch(err => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
