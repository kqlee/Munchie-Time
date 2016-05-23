angular.module('yelpApp', [])

.controller('searchController', function ($scope, $http) {
  $scope.searchBox = 'Find Your Next Meal';

  $scope.data = {};

  var yelpUrl = 'https://api.yelp.com/v2/search';
  var yelpKey = window.consumer_key;

  var defaultParams = {
    location: 'San Francisco',
    term: 'Food', //change to different meals later
    limit: 4,
    sort: 0,
    radius_filter: 8000 //5-mile radius
  };

  $scope.searchYelp = function() {
    $http({
      method: 'POST',
      url: '/yelpSearch',
      params: defaultParams
    }).then(function success(data) {
      console.log(data);
      $scope.data = data;
    }, function error(err) {
      console.error(err);
    });
  };
  
})

.controller('resultsController', function ($scope) {
  $scope.results = 'Search Results:';
  $scope.data = window.examplesearchdata.businesses;

  $scope.addData = function() {
    window.examplesearchdata.businesses.forEach(function(business, index) {
      var storage = $scope.data;
      storage.push(business);

    });  
    console.log($scope.data);
  }; 




});