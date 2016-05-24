var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  token: 'token',
  token_secret: 'token_secret'
});

// Receives data from server
yelp.searchYelp = function(searchPreferences, res) {
  // Per npm's example usage
  yelp.search(searchPreferences)
  .then(function(data) {
    //send the data to function that was requesting
    res.send(data);
  }).catch(function(err) {
    console.error('ERROR:', err);
  });
};

module.exports = yelp;