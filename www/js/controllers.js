angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$firebaseObject) {  
  
  var ref = new Firebase("https://sanmyapp.firebaseio.com/web/saving-data/fireblog");
  var usersRef = ref.child("users");
  usersRef.set({
    userDetails: {
      userName: "san",
      password: "san"
    }
  });

//usersRef.child("userDetails").update(newUserData);
  $scope.user ={
      password :'',
      username:''
    };
  $scope.login=function(){    
    var un = $scope.user.username;
    var pwd = $scope.user.password;

    usersRef.on("value", function(snapshot, prevChildKey) {
      console.log(snapshot.val());
      angular.forEach(snapshot.val(), function(value, key) {
        if(value.password == pwd && value.userName == un){
          alert('your record matched our database.You can start')
        }else{
          alert('your record not matched my database')
        }

      });

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
