angular.module('starter.controllers', [])

.controller('LevelsCtrl', function($scope, $http) {

  var levels;
  //getting list of levels
  $http.get('data/beginnerlevels.json').success(function(data) {
      levels = data;
      $scope.beginnerLevels = chunk(levels, 5);
  });

  function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
 }
})



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LevelCtrl', function($scope, $stateParams, $http) {
        $scope.levelId = $stateParams.id;

        //getting list of levels
        $http.get('data/beginnerLevels.json').success(function(data) {
            $scope.levels = data;
            for (var i=0;i<$scope.levels.length;i++) {
                if($scope.levels[i].id == $scope.levelId) {
                    // lvl is the clicked level
                    $scope.level = $scope.levels[i];
                    break;
                }
            }

            var levelContent = angular.element(document.querySelector('#levelContent'));

            //set the desired content
            //levelContent.html("test");
          })

        $scope.levelContentUrl = function() {
          return "templates/beginnerLevels/level-" + $scope.levelId + ".html";
        };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


