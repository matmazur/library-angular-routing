angular.module('app')
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when("/list", {
                templateUrl: 'js/angular/list/list.html',
                controller: 'ListController',
                controllerAs: 'listCtrl'
            })
            .when("/details/:id", {
                templateUrl: 'js/angular/details/details.html',
                controller: 'DetailsController',
                controllerAs: 'detailsCtrl'
            })
            .when("/new", {
                templateUrl: 'js/angular/new/new.html',
                controller: 'NewController',
                controllerAs: 'newCtrl'
            })
            .when("/login", {
                templateUrl: 'js/angular/auth/login.html',
                controller: 'AuthController',
                controllerAs: 'authCtrl'
            })
            .otherwise({
                redirect: '/list'
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    })