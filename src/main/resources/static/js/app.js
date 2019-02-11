angular.module('app', ['ngRoute'])

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
        function Book(title, author, isbn) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }

        return Book;
    })

    .service("BookService", function () {
        var books = [
            new Book('Steven Sienkiewicz', 'Ból protoplasty', '343267789'),
            new Book('Bob Mickiewicz', 'Prawie, że się popłakałem', "543324427"),
            new Book('Julia Konopnicka', 'Rzeczy', "3432353")
        ];
        this.size = function() {
            return books.length;
        };
        this.getAll = function() {
            return books;
        };
        this.get = function(index) {
            return books[index];
        };
        this.add = function(book) {
            books.push(book);
        }
    })