angular.module('app')

    .factory("Book", function ($resource, BOOK_ENDPOINT) {
        return $resource(BOOK_ENDPOINT);
    })