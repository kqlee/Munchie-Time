angular.module('yelpApp', [])

.controller('searchController', function ($scope, searchFactory) {
  angular.extend($scope, searchFactory);
  $scope.searchBox = 'Find Your Next Meal';

})

.controller('resultsController', function ($scope, searchFactory) {
  angular.extend($scope, searchFactory);
  $scope.currResults = 'Search Results:';

})

//Factory to hold all share methods across controllers
.factory('searchFactory', function($http) {

  var results = [];
  var yelpUrl = 'https://api.yelp.com/v2/search';
  var yelpKey = window.consumer_key;

  var defaultParams = {
    location: 'San Francisco',
    term: 'Food', //change to different meals later
    limit: 3,
    sort: 0,
    radius_filter: 8000 //5-mile radius
  };

  var searchYelp = function() {
    $http.post('/', defaultParams)
    .then(function success(data) {
      console.log('DATA:', data);
      addData(data);
      return data;
    }, function error(err) {
      console.error('ERROR:', err);
    });
  };

  var addData = function(searchQuery) {
    console.log(query);
    var query = searchQuery; //|| window.examplesearchdata.businesses;
    //Change this array to API data later
    query.forEach(function(business, index) {
      results.push(business);
    }); 
  }; 

  //Return an object with shared methods
  return {
    results: results,
    searchYelp: searchYelp,
    addData: addData
  };
});