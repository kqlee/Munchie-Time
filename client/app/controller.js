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

  var neighborhoods = [
    'Ashbury Heights',
    'Balboa Terrace',
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

  var setParameters = function(neighborhood, meal, priceRange) {

  };

  var defaultParams = {
    location: 'San Francisco',
    term: 'brunch', //change to different meals later
    limit: 3,
    sort: 0,
    radius_filter: 8000 //5-mile radius
  };

  var searchYelp = function() {
    $http.post('/', defaultParams)
    .then(function success(data) {
      addData(data);
    }, function error(err) {
      console.error('ERROR:', err);
    });
  };

  var addData = function(searchQuery) {
    var query = searchQuery.data.businesses;
    query.forEach(function(business, index) {
      if (results.length > 2) {
        results = [];
      }
      results.push(business);
    }); 
  }; 

  //Return an object with shared methods
  return {
    results: results,
    setParameters: setParameters,
    searchYelp: searchYelp,
    addData: addData
  };
});