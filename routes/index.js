const express = require('express');
const router = express.Router();

// TODO update routes
router.get('/', function(request, response){
    response.render("index");
});

router.post('/', function(request, response){

    console.log(request.query);

    let words = request.query.words;
    let sentences = request.query.sentences;
    let paragraphs = request.query.paragraphs;

    let tempResponse = {
        words: words,
        sentences: sentences,
        paragraphs: paragraphs
    }

    response.json(tempResponse);
    response.end();
});

// router.get('/paragraph/:amount', function(request, response){
//     let lebowski_array = shuffle_array(lebowski);
//     let model = populate_ipsum((request.params.amount*5)-1, lebowski_array);
//     response.render("index", {model: model});
// });

// router.get('/sentence/:amount', function(request, response){
//     let lebowski_array = shuffle_array(lebowski);
//     let model = populate_ipsum(request.params.amount-1, lebowski_array);
//     response.render("index", {model: model});
// });

// router.get('/word/:amount', function(request, response){
//     let lebowski_array = shuffle_array(lebowski.split(' '));
//     let model = lebowski_array.splice(0, request.params.amount).join(' ');
//     response.render("index", {model: model});
// });

// router.get('/:type/:count')

module.exports = router;
