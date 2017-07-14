const express = require('express');
const router = express.Router();
const lebowski_data = require('../lib/data');

// TODO update routes
router.get('/', (request, response) => {

  if (request.query) {
    let rating = request.query.rating;
    let sentences = request.query.sentences;
    let paragraphs = request.query.paragraphs;

    let model = {};
    model.paragraph = lebowski_ipsum(rating, 'paragraph', paragraphs);
    model.sentence = lebowski_ipsum(rating, 'sentence', sentences);

    return response.render('index', model);
  }
  return response.render('index');
});


// quote arrays
let lebowski = lebowski_data.lebowski;
let the_dude = lebowski_data.r_rated;

//general functions
function populate_ipsum(amount, pi_lebowski) {
    if(!amount){return pi_lebowski[0];}
    return populate_ipsum(amount-1, pi_lebowski) + ' ' + pi_lebowski[amount];
};

function shuffle_array(sa_lebowski){
    let lebowski_array = [];
    for(var i = 0; i < sa_lebowski.length; i++){
      let rand = Math.floor(Math.random() * lebowski_array.length);
      if(rand == 0){lebowski_array.unshift(sa_lebowski[i]);}
      else if(rand == lebowski_array.length-1){lebowski_array.push(sa_lebowski[i]);}
      else{lebowski_array.splice(rand, 0, sa_lebowski[i]);}
    }
    console.log(lebowski_array[0]);
    return lebowski_array;
}


function lebowski_ipsum(rating, type, amount){
    let tmp_lebowski = lebowski;
    if(rating == 'r'){tmp_lebowski = tmp_lebowski.concat(the_dude);}
    let final_lebowski = shuffle_array(tmp_lebowski);
    if(type == 'paragraph'){amount *= 5;}
    let model = populate_ipsum((amount-1), final_lebowski);
    return model;
}


module.exports = router;

