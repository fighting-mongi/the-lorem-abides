var express = require('express');
const mustache = require('mustache-express');
var application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

//string of leboski quotes aka data
let leboski = "this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. this is where phillip will put stuff. I am testing with this. "

//general functions
function add_period(string) { return string+'. '; };

function populate_ipsum(amount, leboski_array) {
    if(!amount){return add_period(leboski_array[0]);}
    console.log('times to populate');
    return populate_ipsum(amount-1, leboski_array) + add_period(leboski_array[amount]);
};

function shuffle_array(leboski_array){
    let leboski_string = '';
    for(var i in leboski_array){
        Math.round(Math.random()) ? 
            leboski_string = leboski_array[i] + ' ' + leboski_string :
            leboski_string = leboski_string + ' ' + leboski_array[i];
    }
    return leboski_string.split(' ');
}

//V2 ideas
//bowling pins sound when page loads
//R rated version
//every n(user input variable) letter in the ipsum
//

application.get('/', function(request, response){
    response.render("index");
});


application.get('/paragraph/:amount', function(request, response){
    let leboski_array = shuffle_array(leboski.split('. '));
    let model = populate_ipsum((request.params.amount*5)-1, leboski_array);
    response.render("index", {model: model});
});


application.get('/sentence/:amount', function(request, response){
    let leboski_array = shuffle_array(leboski.split('. '));
    let model = populate_ipsum(request.params.amount-1, leboski_array);
    response.render("index", {model: model});
});

application.get('/word/:amount', function(request, response){
    let leboski_array = shuffle_array(leboski.split(' '));
    let model = leboski_array.splice(0, request.params.amount).join(' ');
    response.render("index", {model: model});
});

application.listen(3000);