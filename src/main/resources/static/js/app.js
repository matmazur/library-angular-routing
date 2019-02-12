'use strict';

angular.module('app', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {
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
            .otherwise({
                redirect: '/list'
            })

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

    .controller("NewController", function (BookService, Book) {
        var that = this;

        that.book = new Book();
        that.saveBook = function () {
            BookService.add(that.book);
            that.book = new Book();
        }
    });