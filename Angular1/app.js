
var app = angular.module('ToDo', ['ngRoute']);
//start configuring routes  
app.config(['$routeProvider', function ($routeProvider) {
   
    $routeProvider
        .when('/',
            {
                templateUrl: 'views/Registration.html',
                controller: 'RegistrationController'
            }) 
        .when('/Login',
            {
                templateUrl: 'views/Login.html',
                controller: 'LoginController'
            })
        .when('/CreateToDo',
            {
                templateUrl: 'views/CreateToDo.html',
                controller: 'CreateToDoController'
            })
        .when('/EditToDo',
            {
                templateUrl: 'views/EditToDo.html',
                controller: 'EditToDoController'
            })
        .when('/Profile',
            {
                templateUrl: 'views/Profile.html',
                controller: 'ProfileController'
            })
        .when('/ProfileDashboard',
            {
                templateUrl: 'views/ProfileDashboard.html',
                controller: 'ProfiledashboardController'
            })
        .when('/ReadToDo',
            {
                templateUrl: 'views/ReadToDo.html',
                controller: 'ReadToDoController'
            })
        .when('/Registration',
            {
                templateUrl: 'views/Registration.html',
                controller: 'RegistrationController'
            })
        .when('/ToDoItem',
            {
                templateUrl: 'views/ToDoItem.html',
                controller: 'ToDoController'
            })
        ////when the requested url is '/contact then call the view "contact.html" and assign the controller "contactCtrl" to it  
        //.when('/contact',
        //    {
        //        templateUrl: 'views/contact.html',
        //        controller: 'contactCtrl'
        //    })
    //in case any other url is requested then direct the user to home page  
     .otherwise(
      {
        redirectTo: '/'
    });
}])


app.controller('RegistrationController', RegistrationController)
app.controller('LoginController', LoginController)
app.controller('ProfiledashboardController', ProfiledashboardController);
app.controller('ProfileController', ProfileController);
app.controller('CreateToDoController', CreateToDoController);
app.controller('EditToDoController', EditToDoController);
app.controller('ReadToDoController', ReadToDoController);
app.controller('ToDoController', ToDoController);

app.directive('appLogout', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        template: `<div style="z-index: 10;position: absolute;right: 0;top: 0;">
           <input type="button" ng-click="Logout()" value="Logout" />
         </div>`,
        controller: function ($scope) {
            $scope.showflag = true;
            $scope.$on('$routeChangeSuccess', function () {
                //console.log('hiii');
                var str = window.location.href;
                if (str.indexOf('Login') != -1 || str.indexOf('Registration') != -1) {
                    $scope.showflag = false;
                    if (sessionStorage.IsLoggedIn == "true") {

                        window.location.href = "/index.html#!/ProfileDashboard";
                    } 
                }
                else {
                    if ((sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false)) {
                        window.location.href = "/index.html#!/Registration";
                    }
                    $scope.showflag = true;
                }         
                
            });
            
            
            $scope.Logout = function () {
                window.sessionStorage.clear();
                window.location.href =  '/index.html#!/Login';
            }
        },
    }
})
    