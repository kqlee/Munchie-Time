angular.module('yelpApp', [])

.controller('searchController', function ($scope, searchFactory) {

  $scope.searchBox = 'Find Your Next Meal';
  $scope.currResults = 'Recommendations:';

  $scope.finalSearchResults = [];

  $scope.setResults = function(neighborhood, mealSelection, priceSelection) {
    searchFactory.setParameters(neighborhood, mealSelection, priceSelection)
    .then(function(receivedData) {
      $scope.finalSearchResults = receivedData;
    });
  };

  $scope.neighborhoods = [
    'Ashbury Heights',
    'Bayview-Hunters Point',
    'Bernal Heights',
    'Castro',
    'Chinatown',
    'Civic Center',
    'Dogpatch',
    'Embarcadero',
    'Excelsior',
    'Fillmore',
    'Financial District',
    'Fisherman\'s Wharf',
    'Hayes Valley',
    'Inner Richmond',
    'Inner Sunset',
    'Japantown',
    'Mission',
    'Nob Hill',
    'Noe Valley',
    'North Beach/Telegraph Hill',
    'Outer Mission',
    'Outer Richmond',
    'Outer Sunset',
    'Pacific Heights',
    'Parkside',
    'Russian Hill',
    'SoMa',
    'Tenderloin',
    'Western Addition'
  ];

  $scope.meals = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Coffee',
    'Dinner',
    'Dessert'
  ];

  $scope.prices = ['$', '$$', '$$$', '$$$$'];

})

//Factory to hold all share methods across controllers
.factory('searchFactory', function($http) {

  var defaultParams = {
    location: 'San Francisco',
    term: 'food',
    limit: 20,
    sort: 0,
    radius_filter: 3200 //2-mile radius
  };

  var setParameters = function(neighborhood, meal, priceRange) {
    defaultParams.location = 'San Francisco ' + neighborhood;
    defaultParams.term = meal || defaultParams.term;
    // defaultParams.attr = priceRange;
    var temp = [];
    return searchYelp(function(info) {
      temp = temp.concat(info);
    }).then(function() {
      return temp;
    });
  };

  var searchYelp = function(callback) {
    return $http.post('/', defaultParams)
    .then(function success(data, err) {
      return callback(addData(data));
    }, function error(err) {
      console.error('ERROR:', err);
    });
  };

  var addData = function(searchQuery) {
    var query = searchQuery.data.businesses;
    var results = [];

    var randomBusiness = function(businesses) {
      for (var i = 0; i < 3; i++) {
        var randomIndex = Math.floor(Math.random() * businesses.length);
        results.push(businesses[randomIndex]);
        businesses.splice(randomIndex, 1);
      }
    };

    randomBusiness(query);

    return results;
  }; 

  //Return an object with shared methods
  return {
    setParameters: setParameters,
    searchYelp: searchYelp,
    addData: addData
  };
});