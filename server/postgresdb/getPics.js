const unsplash = require('../db/unsplashHelper.js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

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

            axios.get(photoUrl, {responseType: 'stream'})
                .then((picture) => {
                picture.data.pipe(largePicsWriteSteam);
            })

            axios.get(tinyPhotoUrl, {responseType: 'stream'})
                .then((picture) => {
                picture.data.pipe(smallPicsWriteSteam)
            })
        
          listing_id += 1;
        }
      }
    });
  };

  generatePhotos();