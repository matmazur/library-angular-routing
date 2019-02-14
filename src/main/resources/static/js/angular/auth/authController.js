angular.module('app')
    
.controller("AuthController", function ($http, $rootScope, $location, AuthService) {

    var that = this;
    that.credentials = {};

    var loginSuccess = function () {
        $rootScope.authenticated = true;
        $location.path("/new");
        localStorage.setItem("authenticated", $rootScope.authenticated)
    };
    that.login = function () {
        if (that.credentials.username && that.credentials.password) {
            AuthService.authenticate(that.credentials, loginSuccess);
        }
    };
//------------------------------------------------
    var logoutSuccess = function () {
        $rootScope.authenticated = false;
        localStorage.setItem("authenticated", $rootScope.authenticated)
        $location.path("/")
    };
    that.logout = function () {
        AuthService.logout(logoutSuccess);
    }

})