angular
  .module('app')
  .controller('desktopCtrl', desktopCtrl);
desktopCtrl.$inject = ['$scope', '$rootScope'];

function desktopCtrl($scope, $rootScope) {
  var desktopVm = this;
  desktopVm.currentProject = {};

  desktopVm.projects = $scope.$parent.$parent.vm.config.desktop.projects;

  $rootScope.$on('preview-requested', function (event, data) {
    desktopVm.projects = $scope.$parent.$parent.vm.config.desktop.projects;
  });


  desktopVm.loadProject = function (project) {
    if (project.contentType == 'slides') {
      desktopVm.currentProject.slides = project.slides;
      desktopVm.currentProject.address = project.address;
      desktopVm.currentProject.template = 'templates/desktop/desktopSlides.template.html'
    } else if (project.contentType == 'url' || project.contentType == 'html') {
      desktopVm.currentProject.url = project.url;
      desktopVm.currentProject.address = project.address;
      desktopVm.currentProject.template = 'templates/desktop/desktopHtml.template.html'
    }
  }

  desktopVm.goBack = function () {
    desktopVm.currentProject = {};
  }
}
