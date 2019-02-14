angular.module('app')

    .controller("MemoryCtrl", function ($http, $rootScope) {

        this.onPageReload = function () {
            $rootScope.authenticated = localStorage.getItem('authenticated');
            $http.defaults.headers.post.Authorization = localStorage.getItem("auth");

            console.log($http.defaults.headers.post.Authorization);
        }
    })