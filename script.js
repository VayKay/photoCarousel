import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
 stages: [
    { duration: "1m", target: 1250 },
    { duration: "2m", target: 5000 },
    { duration: "1m", target: 2500}
  ],
  vus: 100
};

export default function() {
  var rand = Math.floor(Math.random() * 3);
  if (rand === 0) {
    http.get(`http://localhost:3002/photoCarousel/${Math.floor(Math.random() * 10000000)}`);
    sleep(.5);
  } else  if (rand === 1) {
    http.get(`http://localhost:3002/api/listings/photos/initial/${Math.floor(Math.random() * 10000000)}`);
    sleep(.5);
  } else if ( rand === 2) {
    http.get(`http://localhost:3002/api/listings/photos/${Math.floor(Math.random() * 10000000)}`);
    sleep(.5);
  }
}

