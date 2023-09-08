angular
  .module('liteApp', [])
  .controller('liteCtrl', liteCtrl);
liteCtrl.$inject = ['$scope', '$http', '$window', '$timeout'];

function liteCtrl($scope, $http, $window, $timeout) {
  var vm = this;

  $http.get('config.json').then(function (res) {
    vm.config = angular.fromJson(res.data);
  });
  var maxScroll = angular.element(document.querySelector('#wrapper'))[0].offsetHeight - $window.innerHeight;

  angular.element($window).bind('scroll', function (event) {

    $timeout(function () {
      vm.scrolled = this.pageYOffset / maxScroll;
      $scope.$apply();
    });
  });
}
