
var validUserList = [];
var userName = "";
var password = "";
function LoginController($scope, $log) {
        
        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
        }

        $scope.checkLogin = function() {
            var validUser;

            validUserList.forEach(function(index) {
                if (index.email == $scope.email && index.password == $scope.password) {
                    validUser = true;
                }
            })
            if (validUser == true) {
                SetSessionStoorageLoggedIn();
                //window.location.assign('../Views/ProfileDashboard.html');
                window.location.href = "/index.html#!/ProfileDashboard";
                return false;
            } else {
                alert('Password / UserName is Incorrect !!');
            }
        }

        function SetSessionStoorageLoggedIn() {

            var user = validUserList.filter(function(index) {
                if (index.email == $scope.email && index.password == $scope.password) {
                    return index;
                }

            });
            sessionStorage.IsLoggedIn = true;
            sessionStorage.UserId = user[0].userId;
        }

    }