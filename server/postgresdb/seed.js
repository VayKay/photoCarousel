const faker = require('faker');
const post = require('./index.js');
const fs = require('fs');
const path = require('path');

const writeStream = (stream, data) => {
  if (!stream.write(data)) {
      return new Promise((resolve) => {
          stream.once('drain', resolve);
      })
  }
}

const generateListings = async () => {
  const listingsWriteStream = fs.createWriteStream(path.resolve(__dirname, '../cvsFiles/listings.csv'));
  let id = 1;

  while (id <= 10000000) {
    const ok = writeStream(listingsWriteStream, `${id}\n`);
    if (ok) {
      await ok
    }
    id++;
  }
  console.log('Listings is done!');
};

const generatePhotos = async () => {
  const photosWriteSteam = fs.createWriteStream(path.resolve(__dirname, '../cvsFiles/photos.csv'));
  let listing_id = 1;
  let count = 1;
  let randomNumber;

  while (listing_id <= 10000000) {
    if (listing_id <= 9000000) {
      randomNumber = 5;
    } else if (listing_id > 9000000 && listing_id <= 9500000) {
      randomNumber = (Math.floor(Math.random() * (10 - 5 + 1)) + 5);
    } else if (listing_id > 9500000 && listing_id <= 9700000) {
      randomNumber = (Math.floor(Math.random() * (20 - 10 + 1)) + 10);
    } else if (listing_id > 9700000) {
      randomNumber = (Math.floor(Math.random() * (29 - 20 + 1)) + 20);
    }

    for (let priority = 0; priority < randomNumber; priority++) {
      let randomImage =  Math.floor(Math.random() * Math.floor(1000)) + 1;
      const photoUrl = `https://large-pictures.s3-us-west-1.amazonaws.com/largePics/photo${randomImage}.jpg`;
      const tinyPhotoUrl = `https://small-pictures.s3-us-west-1.amazonaws.com/smallPics/photo${randomImage}.jpg`;
      const caption = faker.lorem.sentence(5);
      var photoArr = [count, listing_id, photoUrl, tinyPhotoUrl, caption, priority].join(',');
      photoArr += '\n';
      count++;

      const ok = writeStream(photosWriteSteam, photoArr);
      if (ok) {
        await ok
      }
      
    }
    if(listing_id % 100000 === 0){
      console.log('%' + listing_id / 100000);
    }

    listing_id += 1;
  }
};

generateListings();
generatePhotos();