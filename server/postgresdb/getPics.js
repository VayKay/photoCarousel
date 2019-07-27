const unsplash = require('../db/unsplashHelper.js');
const fs = require('fs');
const path = require('path');

const writeStream = (stream, data) => {
    if (!stream.write(data)) {
        return new Promise ((resolve) => {
            stream.once('drain', resolve)
        })
    }
}

const generatePhotos = () => {
    let listing_id = 1;
  
    unsplash.getImages('house', (err, houseData) => {
        if (err) {
            console.log(err);
        } else {
        while (listing_id <= 1000) {
            const largePicsWriteSteam = fs.createWriteStream(path.resolve(__dirname, `../pictures/largePics/photo${listing_id}.jpg`));
            const smallPicsWriteSteam = fs.createWriteStream(path.resolve(__dirname, `../pictures/smallPics/photo${listing_id}.jpg`));
            let randomImage =  Math.floor(Math.random() * Math.floor(29));
            const photoUrl = houseData.results[randomImage].urls.regular;
            const tinyPhotoUrl = houseData.results[randomImage].urls.thumb;

            var ok1 = writeStream(largePicsWriteSteam, photoUrl);
            if (!ok1) {
                ok1
            }

            var ok2 = writeStream(smallPicsWriteSteam, tinyPhotoUrl);
            if (!ok2) {
                ok2
            }
        
          listing_id += 1;
        }
      }
    });
  };

  generatePhotos();