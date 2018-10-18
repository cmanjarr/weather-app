/**
 * http://usejsdoc.org/
 */
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');

const app = express()

const apiKey = '@APIKEY_OPENWEATHERMAP@';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	//res.render('index');
	res.render('index', {weather: null, error: null});
	
})

// app.post('/', function (req, res) {
// console.log(req.body.city);
// res.render('index');
// })

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
	  
// invoke api
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error undefined city, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
  
})

app.listen(3000, function () {
  console.log('Simple weather web app listening on port 3000!')
})