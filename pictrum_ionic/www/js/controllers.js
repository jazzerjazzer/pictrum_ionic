angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {


})

/*.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {
	$scope.user = {
		username: "",
		password: ""
	};
	$scope.loginEmail = function(){
		console.log($scope.user.username, $scope.user.password);
		Parse.User.logIn($scope.user.username, $scope.user.password, {
				success: function(user) {
				// Do stuff after successful login.
				console.log(user);
				alert("success!");
			},
				error: function(user, error) {
				// The login failed. Check error to see why.
				alert("error!");
			}
		});
	};


	$scope.loginFacebook = function(){
 
	  //Browser Login
	  if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
	 
	    Parse.FacebookUtils.logIn(null, {
	      success: function(user) {
	        console.log(user);
	        if (!user.existed()) {
	          alert("User signed up and logged in through Facebook!");
	        } else {
	          alert("User logged in through Facebook!");
	        }
	      },
	      error: function(user, error) {
	        alert("User cancelled the Facebook login or did not fully authorize.");
	      }
	    });
	 
	  } 
	  //Native Login
	  else {
	 
	    $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
	 
	      console.log(success);
	 
	      //Need to convert expiresIn format from FB to date
	      var expiration_date = new Date();
	      expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
	      expiration_date = expiration_date.toISOString();
	 
	      var facebookAuthData = {
	        "id": success.authResponse.userID,
	        "access_token": success.authResponse.accessToken,
	        "expiration_date": expiration_date
	      };
	 
	      Parse.FacebookUtils.logIn(facebookAuthData, {
	        success: function(user) {
	          console.log(user);
	          if (!user.existed()) {
	            alert("User signed up and logged in through Facebook!");
	          } else {
	            alert("User logged in through Facebook!");
	          }
	        },
	        error: function(user, error) {
	          alert("User cancelled the Facebook login or did not fully authorize.");
	        }
	      });
	 
	    }, function(error){
	      console.log(error);
	    });
	 
	  }
	 
	};

	$scope.register = function(){
		$state.go('register');
	}
})*/

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook, $localStorage) {
  
  $scope.platform = ionic.Platform.platform();

  
	$scope.user = {
		username: "",
		password: ""
	};
	$scope.loginEmail = function(){
		console.log($scope.user.username, $scope.user.password);
		Parse.User.logIn($scope.user.username, $scope.user.password, {
				success: function(user) {
				// Do stuff after successful login.
				console.log(user);
				alert("success!");
				$state.go('menu.main');
			},
				error: function(user, error) {
				// The login failed. Check error to see why.
				alert("error!");
			}
		});
	};


  $scope.loginFacebook = function(){

    //Browser Login
    //if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
      Parse.FacebookUtils.logIn(null, {
        success: function(user) {
          	console.log(user);

			var access_token = JSON.parse(user._hashedJSON.authData);
			console.log("Access Token: ",  access_token.facebook.access_token);
			$localStorage.accessToken =  access_token.facebook.access_token;

          if (!user.existed()) {
            alert("User signed up and logged in through Facebook!");
            $state.go('menu.main');
          } else {
            alert("User logged in through Facebook!");
            $state.go('menu.main');
          }
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });

    //} 
    //Native Login
    /*else {

      $cordovaFacebook.login(["public_profile", "email"]).then(function(success){

        console.log(success);

        //Need to convert expiresIn format from FB to date
        var expiration_date = new Date();
        expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
        expiration_date = expiration_date.toISOString();

        var facebookAuthData = {
          "id": success.authResponse.userID,
          "access_token": success.authResponse.accessToken,
          "expiration_date": expiration_date
        };

        Parse.FacebookUtils.logIn(facebookAuthData, {
          success: function(user) {
            console.log(user);
            if (!user.existed()) {
              alert("User signed up and logged in through Facebook!");
              state.go('menu.main');
            } else {
              alert("User logged in through Facebook!");
            }
          },
          error: function(user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
          }
        });

      }, function(error){
        console.log(error);
      });

    }*/

  };

})

.controller('RegisterCtrl', function($scope, $ionicLoading, $state, $timeout) {
	$scope.user = {
		username: "",
		email: "",
		password: ""
	};
	$scope.register = function(){

			$ionicLoading.show({
            template: 'Registering...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

		//Create a new user on Parse
		var user = new Parse.User();
		user.set("username", $scope.user.username);
		user.set("password", $scope.user.password);
		user.set("email", $scope.user.email);
		
		console.log($scope.user.username);
		console.log($scope.user.password);
		console.log($scope.user.email);
		
		user.signUp(null, {

			success: function(user) {
				// Hooray! Let them use the app now.
				alert("success!");
				$ionicLoading.hide();
				$state.go('slider');
			},
			error: function(user, error) {
			  // Show the error message somewhere and let the user try again.
			  alert("Error: " + error.code + " " + error.message);
			}
		});
	};
})
.controller('SliderCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
  $scope.startApp = function(){
    $state.go('menu.main');
  }
})
.controller('MainCtrl', function($scope) {

})
.controller("ProfileCtrl", function($scope, $http, $localStorage, $location) {
 	console.log("profileCtrl");
    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
        	console.log("access token in profile ctrl", $localStorage.accessToken);
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                console.log(result.data);
                $scope.base64 = getBase64Image($scope.profileData.picture.data.url);

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };

    function getBase64Image(img) {
	  var canvas = document.createElement("canvas");
	  canvas.width = img.width;
	  canvas.height = img.height;
	  var dataURL = canvas.toDataURL("image/png");
	  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}

	
});