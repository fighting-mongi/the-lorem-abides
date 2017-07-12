var express = require('express');
const mustache = require('mustache-express');
var application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

//string of leboski quotes aka data

let leboski = "Hey nice marmot. Mind if I do a J? I'm the Dude, so that's what you call me. That or, uh is Dudeness, or uh the Duder, or El duderino, if you're into the whole bevity thing. Phone's ringing Dude. I'm throwing rocks tonight. Mark it, Dude. Walter, he peed on my rug. He peed on the Dude's rug. Is this your homwork Larry? Take it easy Dude. Nihilists! Do you have to use so many cuss words? Brandt can't watch, though, or he has to pay a hundred dollars. I'm sorry Smokey. You were over the line, that's a foul. Mark it 8, Dude. Oh come on Donny, they were threatening castration! Are we gonna split hairs here? Am I wrong? Dude, let's go bolwling. You're like a child who wanders into the middle of a movie and wants to know. Also, Dude Chinaman is not the preferred nomenclature. Asian-american please. So what are you saying? When you get divorced you turn in your library card? You get a new license? You stop being Jewish?"


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