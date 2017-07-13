const express = require('express');
const mustache = require('mustache-express');
const body_parser = require('body-parser');
const index = require('./routes/index');
const lebowski_data = require('./lib/data');

const application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

// quote arrays
let lebowski = lebowski_data.lebowski;
let the_dude = lebowski_data.r_rated;

//general functions
function populate_ipsum(amount, lebowski) {
    if(!amount){return lebowski[0];}
    console.log('times to populate');
    return populate_ipsum(amount-1, lebowski) + ' ' + lebowski[amount];
};

console.log(populate_ipsum(2, lebowski));

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

// route middleware
application.use('/', index);

// error handling middleware
application.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

application.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

application.listen(3000, () => {
    console.log('Listening on 3000')
});