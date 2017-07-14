const express = require('express');
const router = express.Router();

const lebowski_data = require('../lib/data');

// TODO update routes
router.get('/', (request, response) => {

  if (request.query) {
    let rating = request.query.rating;
    let sentences = request.query.sentences;
    let paragraphs = request.query.paragraphs;

    let model = lebowski_ipsum(rating, sentences, paragraphs);

    return response.render('index', model);
  }
  return response.render('index');
});

/*********************************************/
/********** AUSTIN'S DANK FUNCTIONS **********/
/*********************************************/

// quote arrays
let lebowski = lebowski_data.lebowski;
let the_dude = lebowski_data.r_rated;

function populate_ipsum(sentences, lebowski) {
  if (!sentences) {
    return lebowski[0];
  }
  return populate_ipsum(sentences - 1, lebowski) + ' ' + lebowski[sentences];
};

function shuffle_array(lebowski) {
  let lebowski_array = [];

  for (var i in lebowski) {
    Math.round(Math.random()) ?
      lebowski_array.push(lebowski[i]) :
      lebowski_array.unshift(lebowski[i]);
  }

  return lebowski_array;
}

function lebowski_ipsum(rating, sentences, paragraphs) {
  let tmp_lebowski = lebowski;
  let model = {};
  model.ipsums = [];

  // array creation/randomization
  if (rating == 'r') {
    tmp_lebowski = tmp_lebowski.concat(the_dude);
  }
  let lebowski_array = shuffle_array(tmp_lebowski);

  for (let i = 0; i < paragraphs; i++) {
    lebowski_array = shuffle_array(tmp_lebowski);
    model.ipsums.push(populate_ipsum((sentences - 1), lebowski_array));
  }
  return model;
}

module.exports = router;
