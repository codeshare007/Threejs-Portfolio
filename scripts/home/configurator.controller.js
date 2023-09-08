angular
  .module('app')
  .controller('configuratorCtrl', configuratorCtrl);
configuratorCtrl.$inject = ['$scope', '$rootScope', 'FileSaver', 'Blob', '$http'];

function configuratorCtrl($scope, $rootScope, FileSaver, Blob, $http) {
  var vm = this;
  vm.cameraTypes = ['Top Front Left', 'Top Front Right', 'Top', 'Top Front'];
  vm.phoneContentTypes = ['url', 'slides', 'invision', 'html'];
  vm.tabletContentTypes = ['url', 'slides', 'invision', 'html'];
  vm.desktopContentTypes = ['url', 'slides', 'html'];


  $http.get('config.json').then(function (res) {
    vm.config = angular.fromJson(res.data);
  });

  vm.addSlide = function (collection) {
    collection.push('');
  };
  vm.addSocial = function (collection) {
    collection.push({
      icon: '',
      url: '',
      name: ''
    });
  };
  vm.addProject = function (collection) {
    collection.push({
      slides: [''],
      swiperInstance: {}
    });
  };
  vm.removeProject = function (collection, index) {
    collection.splice(index, 1);
  };
  vm.removeSocial = function (collection, index) {
    collection.splice(index, 1);
  };
  vm.removeSlide = function (collection, index) {
    collection.splice(index, 1);
  };
  vm.preview = function () {
    $rootScope.$emit('preview-requested', vm.config);
  }
  vm.anyFormInvalid = function () {
    for (var property in vm.forms) {
      if (vm.forms.hasOwnProperty(property)) {
        if (vm.forms[property].$invalid) {
          return true
        }
      }
    }
    return false
  }

  vm.download = function () {
    var text = angular.toJson(vm.config);
    var data = new Blob([text], {
      type: 'text/plain;charset=utf-8'
    });
    FileSaver.saveAs(data, 'config.json');
  };
};
