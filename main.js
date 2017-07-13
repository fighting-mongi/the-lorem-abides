const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const mustache = require('mustache-express');
const index = require('./routes/index');
const lebowski_data = require('./lib/data');

const application = express();

application.engine('mustache', mustache());

application.set('views', path.join(__dirname, 'views'));
application.set('view engine', 'mustache');

// public path
application.use(express.static(path.join(__dirname, 'public')));

// route middleware
application.use('/', index);

// misc middleware
application.use(body_parser.json());
application.use(body_parser.urlencoded({ extended: false }));

// error handling middleware
application.use((request, response, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});

application.use((error, request, response, next) => {
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};

    response.status(error.status || 500);
    response.render('error');
});

application.listen(3000, () => {
    console.log('Listening on 3000')
});


/******DATA******/

// quote arrays
let lebowski = lebowski_data.lebowski;
let the_dude = lebowski_data.r_rated;

//general functions
function populate_ipsum(amount, lebowski) {
    if(!amount){return lebowski[0];}
    console.log('times to populate');
    return populate_ipsum(amount-1, lebowski) + ' ' + lebowski[amount];
};

function shuffle_array(lebowski_array){
    let lebowski_string = '';
    for(var i in lebowski_array){
        Math.round(Math.random()) ? 
            lebowski_string = lebowski_array[i] + ' ' + lebowski_string :
            lebowski_string = lebowski_string + ' ' + lebowski_array[i];
    }
    return lebowski_string.split(' ');
}

//V2 ideas
//bowling pins sound when page loads
//R rated version
//every n(user input variable) letter in the ipsum
//
