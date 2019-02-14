angular.module('app')

    .controller("ListController", function (BookService, $timeout) {
        var that = this;

        that.books = BookService.getAll();
        console.log(BookService.getAll());

        if (localStorage.getItem('added') === 'true') {
            $timeout(function () {
                that.books = BookService.getAll();
            }, 1000);
            localStorage.setItem('added', null);
        }
    })