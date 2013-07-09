function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function random_color(length) {
    var chars = '0123456789ABCDEF'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


// dummy generate data
data = {};
  for (var i = 0; i < 100; i++) {
    data[randomString(8)] = {id: randomString(8),
    name: 'lorem ipsum something',
    artist: 'ayal gelles' + randomString(8),
    thumb: 'http://dummyimage.com/200x134/000/' + random_color(3),
    src: 'http://dummyimage.com/500x500/000/' + random_color(3) };
  }

////

var app = angular.module('averagely-gallery', []);

app.config(function($locationProvider, $routeProvider) {
//  $locationProvider.html5Mode(true);
      $routeProvider
      .when("/",{})
      .when("/img/:id",{kaka: 1})
})

app.controller('GalleryCtrl', function($scope, $http, $route, $routeParams) {
  $http({method: 'GET', url: '/data.json'}).
  success(function(data, status, headers, config) {
    console.log('go data!',data);
    $scope.data = data;
  }).
  error(function(_, status, headers, config) {
    console.log('could not get /data.json', data);
    $scope.data = data;
  });

   $scope.nogo = true;

   $scope.$on('$routeChangeSuccess', function() {
     console.log('ROUTE!', $routeParams);
    if ($routeParams.id) {
      $('.modal').modal('show');
      $scope.imgfordialog = $scope.data[$routeParams.id];
    }
    else {
      $('.modal').modal('hide');

    }
  });


});
