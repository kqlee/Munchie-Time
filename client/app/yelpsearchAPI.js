var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Yelp = require('Yelp');

var yelp = new Yelp({
  consumer_key: window.consumer_key,
  consumer_secret: window.consumer_secret,
  token: window.token,
  token_secret: window.token_secret
});

//Receives data from server
yelp.searchYelp = function(term, res) {
  yelp.search({
    term: 'food',
    location: 'San Francisco'
  })
  .then(function(data) {
    //handle data
    console.log(data);
    res.send(data);
  }).catch(function(err) {
    console.error(err);
  })

  ;
};


module.exports = yelp;

/* SF Neighborhoods

Alamo Square
Anza Vista
Ashbury Heights
Balboa Terrace
Bayview-Hunters Point
Bernal Heights
Castro
Chinatown
Civic Center
Cole Valley
Corona Heights
Crocker-Amazon
Diamond Heights
Dogpatch
Duboce Triangle
Embarcadero
Excelsior
Fillmore
Financial District
Fisherman's Wharf
Forest Hill
Glen Park
Hayes Valley
Ingleside
Ingleside Heights
Ingleside Terraces
Inner Richmond
Inner Sunset
Japantown
Lakeshore
Lakeside
Laurel Heights
Lower Haight
Lower Nob Hill
Lower Pacific Heights
Marina/Cow Hollow
Merced Heights
Merced Manor
Miraloma Park
Mission
Mission Bay
Mission Terrace
Monterey Heights
Mount Davidson Manor
NoPa
Nob Hill
Noe Valley
North Beach/Telegraph Hill
Oceanview
Outer Mission
Outer Richmond
Outer Sunset
Pacific Heights
Parkmerced
Parkside
Portola
Potrero Hill
Presidio
Presidio Heights
Russian Hill
Sea Cliff
Sherwood Forest
SoMa
South Beach
St Francis Wood
Stonestown
Sunnyside
Tenderloin
The Haight
Twin Peaks
Union Square
Visitacion Valley
West Portal
Western Addition
Westwood Highlands
Westwood Park

*/