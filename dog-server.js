//demo walkthrough

//check if mysql is running - sudo service mysql status

//npm init (use default stuff)

//npm install --save express body-parser mysql pug

//express is a lightweight server
//body-parser allows us to get the information from http requests (like $_POST in php)

//first we import our modules
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//this gives us a handle to the application itself - it comes from the express module, obviously.
var app = express();

//the app.set() function changes our server settings
//we want to use pug to render pages for the user, so we tell express that
app.set('view engine', 'pug');

//this returns an object that allows us to connect to the database
var dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dogs',
    dateStrings: 'date'
});

//the function passed to the app.use function will be executed every time the server reieves a request
//this is going to take all the fields in the request and turn them into easy to access variables
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function () {
    console.log('listening on port 3000')
});

//this tells the server how to respond when it gets a post request at the path '/add_dog'
//it will pass our request and our response to the function we give as the second argument
app.post('/add_dog', function (request, response) {

    //because we told the server to use bodyParser for each request, we can just access the fields by the names we gave them in html
    var dogName = request.body.dog_name;
    var dogBirthday = request.body.dog_birthday;
    var dogSize = request.body.dog_size;

    //note - if the dog's name has any quotes in it that throws off the whole thing and it doesn't work.
    var insertDogQuery = "insert into dogs (name, birthday, size) values ('" + dogName + "', '" + dogBirthday + "', '" + dogSize + "');";

    //the first argument is the query, the second argument is a callback function that will be passed the results of the query
    dbConnection.query(insertDogQuery, function (err, result, fields) {

        if (err) throw err;
        console.log(result);
        response.render('dog_added', {"dogName": dogName});

    });

});

app.post('/view_all_dogs', function (request, response) {

    var getDogsQuery = "select * from dogs;";

    dbConnection.query(getDogsQuery, function (err, result, fields) {

        //result is an array of objects. so we can get the data by calling result[i].field_name

        //this array will store the data from our dogs
        var dogs = [];

        result.forEach(function (dogData) {
            dogs.push({'name': dogData.name, 'birthday': dogData.birthday, 'size': dogData.size});
        });

        response.render('dog_list', {'dogs': dogs, 'dogSize': 'All'});

    });

});

app.post('/view_dogs_by_size', function (request, response) {

    var dogSize = request.body.dog_size;

    //note the quotation types and placement.
    var getDogsQuery = "select * from dogs where size='" + dogSize + "';";

    dbConnection.query(getDogsQuery, function (err, result, fields){

        var dogs = [];

        for (var i = 0; i < result.length; i++) {
            var dog = {'name': result[i].name, 'birthday': result[i].birthday, 'size': result[i].size};
            dogs.push(dog);
        }

        response.render('dog_list', {"dogs": dogs, "dogSize": dogSize});

    });

});