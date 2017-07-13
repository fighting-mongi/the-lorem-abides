const lebowski_data = require('./data');

//V2 ideas
//bowling pins sound when page loads
//every n(user input variable) letter in the ipsum

// quote arrays
let lebowski = lebowski_data.lebowski;
let the_dude = lebowski_data.r_rated;

//general functions
function populate_ipsum(amount, lebowski) {
    if(!amount){return lebowski[0];}
    return populate_ipsum(amount-1, lebowski) + ' ' + lebowski[amount];
};

function shuffle_array(lebowski){
    let lebowski_array = [];
    for(var i in lebowski){
        Math.round(Math.random()) ? 
            lebowski_array.push(lebowski[i]):
            lebowski_array.unshift(lebowski[i]);
    }
    return lebowski_array;
}

function lebowski_ipsum(rating, type, amount){
    let tmp_lebowski = lebowski;
    if(rating == 'r'){tmp_lebowski = tmp_lebowski.concat(the_dude);}
    let lebowski_array = shuffle_array(tmp_lebowski);
    if(type == 'paragraph'){amount *= 5;}
    let model = populate_ipsum((amount-1), lebowski_array);
    if(type == 'word'){model = populate_ipsum((amount-1), model.split(' '));}
    response.render("index", {model: model});
}
