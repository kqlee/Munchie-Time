angular.module('yelpApp', [])

.controller('searchController', function ($scope, searchFactory) {
  angular.extend($scope, searchFactory);
  $scope.searchBox = 'Find Your Next Meal';

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

.controller('resultsController', function ($scope, searchFactory) {
  angular.extend($scope, searchFactory);
  $scope.currResults = 'Recommendations:';

})

//Factory to hold all share methods across controllers
.factory('searchFactory', function($http) {

  var results = [];

  var defaultParams = {
    location: 'San Francisco',
    term: 'food',
    limit: 3,
    sort: 0,
    radius_filter: 3200 //2-mile radius
  };

  var setParameters = function(neighborhood, meal, priceRange) {
    defaultParams.location = 'San Francisco ' + neighborhood;
    defaultParams.term = meal || defaultParams.term;
    // defaultParams.attr = priceRange;
    searchYelp();
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

  var showSelectedValue = function(val) {
    console.log(val);
  };

  //Return an object with shared methods
  return {
    results: results,
    setParameters: setParameters,
    searchYelp: searchYelp,
    addData: addData,
    showSelectedValue: showSelectedValue
  };
});