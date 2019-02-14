angular.module('app')

    .constant("BOOK_ENDPOINT", "/api/books/:id")

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