angular.module('yelpApp', [])

.controller('searchController', function ($scope, $http) {
  $scope.searchtest = 'ANGULAR SEARCH BOX';

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
  $scope.results = 'ANGULAR RESULTS BOX';
  $scope.data = window.examplesearchdata.businesses;

  $scope.addData = function() {
    window.examplesearchdata.businesses.forEach(function(business, index) {
      var storage = $scope.data;
      // storage.name[index] = business.name;
      // storage.reviews[index] = business.review_count;
      // storage.url[index] = business.url;
      // storage.snippet[index] = business.snippet_text;
      // storage.address = business.location.display_address;
      // storage.images[index] = business.image_url;
      storage.push(business);

    });  
    console.log($scope.data);
  }; 




});