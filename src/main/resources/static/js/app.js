angular.module('app',['ngRoute'])

.config(function ($routeProvider) {
    $routeProvider
        .when("/list",{
            templateUrl:'html/fragments/list.html',
            controller:'ListController',
            controllerAs:'listCtrl'
        })
        .when("/details/:id",{
            templateUrl:'html/fragments/details.html',
            controller:'DetailsController',
            controllerAs:'detailsCtrl'
        })
        .when("/new",{
            templateUrl:'html/fragments/new.html',
            controller:'NewController',
            controllerAs:'newCtrl'
        })
        .otherwise({
            redirect:'/list'
        })

})