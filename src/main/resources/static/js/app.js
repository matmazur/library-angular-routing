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
                templateUrl: 'html/fragments/new.html',
                controller: 'NewController',
                controllerAs: 'newCtrl'
            })
            .when("/login", {
                templateUrl: 'html/fragments/login.html',
                controller: 'AuthController',
                controllerAs: 'authCtrl'
            })
            .otherwise({
                redirect: '/list'
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    })

    .constant("BOOK_ENDPOINT", "/api/books/:id")

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

    .controller("ListController", function (BookService) {
        var that = this;

        that.books = BookService.getAll();
    })

    .controller("DetailsController", function (BookService, $routeParams) {
        var that = this;

        var index = $routeParams.id;
        that.book = BookService.get(index);
    })

    .controller("NewController", function (BookService, Book, $location) {
        var that = this;

        that.book = new Book();
        that.saveBook = function () {
            BookService.add(that.book);
            that.book = new Book();
            $location.path("/list");
        }
    })

    //-----------AUTHENTICATION--------------//

    .constant('LOGIN_ENDPOINT', '/login')
    .constant('LOGOUT_ENDPOINT', '/logout')

    .service('AuthService', function ($http, LOGIN_ENDPOINT, LOGOUT_ENDPOINT) {

        this.authenticate = function (credentials, successCallback) {
            var authHeader = {Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)};
            var config = {headers: authHeader};
            console.log(credentials);

            $http
                .post(LOGIN_ENDPOINT, {}, config)
                .then(function success(value) {
                        console.log("success");
                        successCallback();
                    },
                    function error(reason) {
                        console.log("Login unsuccessful\n");
                        console.log(reason);

                    });
        };

        this.logout = function (successCallback) {
            $http.post(LOGOUT_ENDPOINT).then(successCallback);
        }
    })

    .controller("AuthController", function ($rootScope, $location, AuthService) {

        var that = this;
        that.credentials = {};

        var loginSuccess = function () {
            $rootScope.authenticated = true;
            $location.path("/new")
        };
        that.login = function () {
            AuthService.authenticate(that.credentials, loginSuccess);
        };
//------------------------------------------------
        var logoutSuccess = function () {
            $rootScope.authenticated = false;
            $location.path("/")
        };
        that.logout = function () {
            AuthService.logout(logoutSuccess());
        }
    });