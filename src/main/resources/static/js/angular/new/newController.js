angular.module('app')

    .value("added", false)
    .controller("NewController", function (BookService, Book, $location) {
        var that = this;

        that.book = new Book();
        that.saveBook = function () {
            BookService.add(that.book);
            that.book = new Book();
            localStorage.setItem('added', "true");
            $location.url("/list/");
        }
    })
