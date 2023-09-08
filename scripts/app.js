angular
  .module('app', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ui.select',
    'ngSanitize',
    'ksSwiper',
    'app.objects',
    'app.scene',
    'colorpicker.module',
    'ngFileSaver'
  ])
  //   .config(['$locationProvider', '$qProvider', '$compileProvider', function ($locationProvider, $qProvider, $compileProvider) {

  //   }])
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {


  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode({
    //   enabled: true
    // });
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'templates/home.html',
      })
      .state('app.phone', {
        url: 'phone',
        params: {
          subtitle: 'phone'
        }
      })
      .state('app.tablet', {
        url: 'tablet',
        params: {
          subtitle: 'tablet'
        }
      })
      .state('app.portfolio1', {
        url: 'portfolio1',
        params: {
          subtitle: 'portfolio1'
        }
      })
      .state('app.portfolio2', {
        url: 'portfolio2',
        params: {
          subtitle: 'portfolio2'
        }
      })
      .state('app.portfolio3', {
        url: 'portfolio3',
        params: {
          subtitle: 'portfolio3'
        }
      })
      .state('app.desktop', {
        url: 'desktop',
        params: {
          subtitle: 'desktop'
        }
      })
      .state('app.postCard', {
        url: 'postCard',
        params: {
          subtitle: 'postCard'
        }
      })
      .state('app.businessCard', {
        url: 'businessCard',
        params: {
          subtitle: 'businessCard'
        }
      })
      .state('app.personalResume', {
        url: 'personalResume',
        params: {
          subtitle: 'personalResume'
        }
      })


  }]);
