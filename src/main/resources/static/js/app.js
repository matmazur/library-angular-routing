'use strict';

angular.module('app', ['ngRoute','ngResource'])
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

    .factory("Book", function () {
        function Book(id, title, author, isbn) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }

        return Book;
    })

    .service("BookService", function (Book) {
        var books = [
            new Book(1, 'Steven Sienkiewicz', 'Ból protoplasty', '343267789'),
            new Book(2, 'Bob Mickiewicz', 'Prawie, że się popłakałem', "543324427"),
            new Book(3, 'Julia Konopnicka', 'Rzeczy', "3432353")
        ];
        this.size = function () {
            return books.length;
        };
        this.getAll = function () {
            return books;
        };
        this.get = function (index) {
            return books[index];
        };
        this.add = function (book) {
            books.push(book);
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
            that.book.id = BookService.size();
            BookService.add(that.book);
            that.book = new Book();
        }
    });