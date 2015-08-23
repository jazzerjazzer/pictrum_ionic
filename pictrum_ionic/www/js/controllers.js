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

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook, $localStorage, $ionicLoading) {
  
  $scope.platform = ionic.Platform.platform();

  
	$scope.user = {
		username: "",
		password: ""
	};
	$scope.loginEmail = function(){
		
		$ionicLoading.show({
			template: 'Please wait...'
		});

		console.log($scope.user.username, $scope.user.password);
		Parse.User.logIn($scope.user.username, $scope.user.password, {
				success: function(user) {
				// Do stuff after successful login.
				$state.go('menu.albums');
				$ionicLoading.hide();
			},
				error: function(user, error) {
				// The login failed. Check error to see why.
				alert("error!");
				$ionicLoading.hide();
			}
		});
	};


  $scope.loginFacebook = function(){

    //Browser Login
    //if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
    	$ionicLoading.show({
			template: 'Please wait...'
		});
      Parse.FacebookUtils.logIn(null, {
        success: function(user) {
          	console.log(user);

			var access_token = JSON.parse(user._hashedJSON.authData);
			console.log("Access Token: ",  access_token.facebook.access_token);
			$localStorage.accessToken =  access_token.facebook.access_token;

          if (!user.existed()) {
            console.log("User signed up and logged in through Facebook!");
            //$state.go('menu.main');
            $state.go('menu.albums');
          } else {
            console.log("User logged in through Facebook!");
            //$state.go('menu.main');
            $state.go('menu.albums');
          }
          $ionicLoading.hide();
        },
        error: function(user, error) {
          $ionicLoading.hide();
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
.controller('PhotoCtrl', function($scope, $ionicHistory) {


	/*$scope.photoSelect = function(){
		var fileUploadControl = $("#profilePhotoFileUpload")[0];
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = file.name;
			var parseFile = new Parse.File(name, file);
			
			parseFile.save().then(function() {
				// The file has been saved to Parse.
				alert("Photo saved");
				var photoUpload = new Parse.Object("photo");
				photoUpload.set("name", name);
				photoUpload.save();

				var profilePhoto = photo.get("photoFile");
				$("profileImg")[0].src = profilePhoto.url();

			}, function(error) {
				alert("Photo cannot be saved");
				// The file either could not be read, or could not be saved to Parse.
			});
		}
	}*/

	$scope.images = [];
 
    for(var i = 0; i < 100; i++) {
        $scope.images.push({id: i, src: "http://placehold.it/50x50"});
    }

    $scope.goBack = function() {
		$ionicHistory.goBack();
	};
    
})
.controller('AlbumCtrl', function($scope, $ionicModal) {

	$scope.showAlbumDetails = function(albumID) {
		$state.go('photos', {'albumID': albumID});
	}
	$ionicModal.fromTemplateUrl('templates/newAlbumModal.html', {
		scope: $scope
			}).then(function(modal) {
		$scope.modal = modal;
	});
  
  $scope.createContact = function(u) {        
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

})
.controller("ProfileCtrl", function($scope, $http, $localStorage, $location) {
 	console.log("profileCtrl");
    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
        	console.log("access token in profile ctrl", $localStorage.accessToken);
            $http.get("https://graph.facebook.com/v2.2/me", { params: { 
            	access_token: $localStorage.accessToken, 
            	fields: "id,name,gender,location,website,picture,relationship_status", 
            	format: "json" }}).then(function(result) {
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
});