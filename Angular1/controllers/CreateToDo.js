var validUserList = [];
var userId = "";

function CreateToDoController($scope, $log) {

        //sessionservice.checksession();

        userId = window.sessionStorage.UserId;
        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
        }

        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("date")[0].setAttribute('min', today);
        document.getElementsByName("reminderDate")[0].setAttribute('min', today);
        $scope.isVisible = false;


    $scope.CreateToDoItem = function () {

        if ($scope.toDoItem == " " || $scope.toDoItem == "" || $scope.toDoItem == undefined || $scope.toDoItem == null) {
            alert('To Do Item text is mandatory');
            return;
        }

        if (date.value == "") {
            alert('date is mandatory');
            return;
        }
            if (date.value < reminderDate.value) {
                alert('Reminder date should be less than To do date');
                return false;
            }
        if ($scope.categories == " " || $scope.categories == "" || $scope.categories == undefined || $scope.categories == null) {
                alert('Category value is mandatory');
                return;
            }
        if ($scope.status == " " || $scope.status == "" || $scope.status == undefined || $scope.status == null) {
                alert('status value is mandatory');
                return;
            }
            if ($scope.isReminder == "Yes") {
                if ($scope.reminderDate == "" || $scope.reminderDate == undefined || $scope.reminderDate == null) {
                    alert('Reminder date value is mandatory');
                    return;
                }
            }
            var todoItem = {
                todoId: getNextToDoId() + 1,
                toDoItem: $scope.toDoItem,
                date: date.value,
                categories: $scope.categories,
                status: $scope.status,
                isReminder: $scope.isReminder,
                reminderDate: reminderDate.value,
                isPublic: $scope.isPublic

            }
            var foundIndex = validUserList.findIndex(function(index) { return index.userId == userId });
            validUserList[foundIndex].toDoList.push(todoItem);
            localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
            alert('To Do item created Successfully;');
            window.location.assign("/index.html#!/ToDoItem");
            return true;
        }

        $scope.getstatus = function() {
            if ($scope.isReminder == "Yes") {
                $scope.isVisible = true;
            } else {
                $scope.isVisible = false;
                $scope.reminderDate = "";
            }
        }


        function getNextToDoId() {
            var tempuser = validUserList.filter(function(index) {
                if (index.userId == sessionStorage.UserId) {
                    return index;
                }
            });
            if (tempuser[0].toDoList.length == 0) {
                return 0;
            } else {
                return Math.max.apply(Math, tempuser[0].toDoList.map(function(o) { return o.todoId }))
            }

        }

    }