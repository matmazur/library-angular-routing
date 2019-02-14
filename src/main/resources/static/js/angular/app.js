'use strict';

angular.module('app', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when("/list", {
                templateUrl: 'html/fragments/list.html',
                controller: 'ListController',
                controllerAs: 'listCtrl'
            })
            .when("/details/:id", {
                templateUrl: 'html/fragments/details.html',
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

    .constant("BOOK_ENDPOINT", "/api/books/:id")
    .value("added", false)


    .factory("Book", function ($resource, BOOK_ENDPOINT) {
        return $resource(BOOK_ENDPOINT);
    })

    .service("BookService", function (Book) {

        this.size = function () {
            return getAll().length;
        };
        this.getAll = function () {
            return Book.query();
        };
        this.get = function (index) {
            return Book.get({id: index});
        };
        this.add = function (book) {
            book.$save();
        }
    })

    .controller("ListController", function (BookService, $timeout) {
        var that = this;

        that.books = BookService.getAll();
        console.log(BookService.getAll());

        if (localStorage.getItem('added')==='true') {
            $timeout(function () {
                that.books = BookService.getAll();
            }, 1000);
            localStorage.setItem('added', null);
        }

    })

    .controller("DetailsController", function (BookService, $routeParams) {
        var that = this;

        var index = $routeParams.id;
        that.book = BookService.get(index);
    })


    //-----------AUTHENTICATION--------------//


    .controller("MemoryCtrl", function ($http, $rootScope) {

        this.onPageReload = function () {
            $rootScope.authenticated = localStorage.getItem('authenticated');
            $http.defaults.headers.post.Authorization = localStorage.getItem("auth");

            console.log($http.defaults.headers.post.Authorization);
        }
    })

    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });

