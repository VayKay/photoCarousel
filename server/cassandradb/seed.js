const faker = require('faker');
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
  const photosWriteSteam = fs.createWriteStream(path.resolve(__dirname, './cassCsvFiles/listings.csv'));
  let listing_id = 1;
  let count = 1;
  let randomNumber;

  while (listing_id <= 10000000) {
    if (listing_id <= 9000000) {
      randomNumber = 5;
    } else if (listing_id > 9000000 && listing_id <= 9500000) {
      randomNumber = (Math.floor(Math.random() * (8 - 5 + 1)) + 5);
    } else if (listing_id > 9500000 && listing_id <= 9800000) {
      randomNumber = (Math.floor(Math.random() * (15 - 8 + 1)) + 8);
    } else if (listing_id > 9800000) {
      randomNumber = (Math.floor(Math.random() * (20 - 15 + 1)) + 15);
    }

    for (let priority = 0; priority < randomNumber; priority++) {
      let randomImage =  Math.floor(Math.random() * Math.floor(1000)) + 1;
      const photoUrl = `https://large-pictures.s3-us-west-1.amazonaws.com/largePics/photo${randomImage}.jpg`;
      const tinyPhotoUrl = `https://small-pictures.s3-us-west-1.amazonaws.com/smallPics/photo${randomImage}.jpg`;
      const caption = faker.lorem.sentence(5);
      var photoArr = [listing_id, count, caption, photoUrl, priority, tinyPhotoUrl].join('|');
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