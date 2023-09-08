angular
  .module('app')
  .controller('appCtrl', appCtrl);
appCtrl.$inject = ['$q', '$scope', '$rootScope', '$timeout', '$http'];

function appCtrl($q, $scope, $rootScope, $timeout, $http) {
  var vm = this;

  $http.get('config.json').then(function (res) {
    vm.config = angular.fromJson(res.data);
  });

  $rootScope.$on('preview-requested', function (event, data) {
    vm.config = data;

  });


}
