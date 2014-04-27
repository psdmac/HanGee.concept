myApp = angular.module 'myApp',['ngSanitize','ngAnimate','angulartics','angulartics.google.analytics']

# myApp.config ['$locationProvider','$stateProvider', '$urlRouterProvider', '$analyticsProvider','$compileProvider', ($locationProvider, $stateProvider, $urlRouterProvider, $analyticsProvider, $compileProvider) ->
#   # oldWhiteList = $compileProvider.imgSrcSanitizationWhitelist()
#   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//)
#   $urlRouterProvider.otherwise "/1"
#   $locationProvider.html5Mode false
#   $locationProvider.hashPrefix "!"
#   $analyticsProvider.virtualPageviews(false)
#   $stateProvider
#     .state 'phone',
#       url: "/1"
#       templateUrl: "views/phone.html"
#       controller: 'MainCtrl'
#       index: 1
#     .state 'contact',
#       url: "/2"
#       templateUrl: "views/contact.html"
#       controller: 'MainCtrl'
#       index: 2
#     .state 'setting',
#       url: "/3"
#       templateUrl: "views/setting.html"
#       index: 3
# ]

# myApp.run ['$rootScope','$window', ($rootScope, $window) ->
#   $rootScope.direction = 'ltr'
#   oldIdx = undefined
#   $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
#     $rootScope.direction = 'rtl'
#     if oldIdx is undefined or oldIdx < toState.index
#       console.log 'rtl'
#       $rootScope.direction = 'rtl'
#       oldIdx = toState.index
#     else if oldIdx > toState.index
#       console.log 'ltr'
#       $rootScope.direction = 'ltr'
#       oldIdx = toState.index
# ]

