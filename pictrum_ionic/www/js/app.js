// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

/*.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
      window.fbAsyncInit = function() {
          Parse.FacebookUtils.init({
              appId      : '608860305923719', 
              version    : 'v2.3',
              xfbml      : true
          });
      };
     
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }

    Parse.initialize("pu1ooGpu4cfi8OlDFHX01kGrT81IeokjfcFJ2Jm5", "Zd7UqkSSSiHwNbYEkdFUGaSBEygzLIj1FCFKiJvO");  });
})*/

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    console.warn("You need to insert your own APP ID and JAVASCRIPT KEY from Parse.");
    Parse.initialize("pu1ooGpu4cfi8OlDFHX01kGrT81IeokjfcFJ2Jm5", "Zd7UqkSSSiHwNbYEkdFUGaSBEygzLIj1FCFKiJvO");

    if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
      window.fbAsyncInit = function() {
          Parse.FacebookUtils.init({
              appId      : '608860305923719', 
              version    : 'v2.3',
              xfbml      : true
          });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
        })

        .state('slider', {
            url: '/slider',
            templateUrl: 'templates/slider.html',
            controller: 'SliderCtrl'
        })

        .state('menu', {
            url: '/menu',
            abstract: true,
            templateUrl: 'templates/menu.html'
        })
        .state('menu.main', {
            url: 'main',
            views: {
                'menuContent': {
                    templateUrl: 'templates/main.html',
                    controller: 'MainCtrl'
            }
          },
        })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
