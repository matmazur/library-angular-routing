angular.module('app')

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
                        $http.defaults.headers.post.Authorization = authHeader.Authorization;
                        localStorage.setItem('auth', $http.defaults.headers.post.Authorization);
                        console.log("success user " + credentials.username);
                        successCallback();
                    },
                    function error(reason) {
                        console.log("Login unsuccessful\n");
                        console.log(reason);
                    });
        };

        this.logout = function (successCallback) {
            delete $http.defaults.headers.post.Authorization;
            localStorage.setItem('auth', null);
            successCallback();
        }

    })
