angular.module('login.controllers', [])

.controller("AppCtrl", function($scope) {
	console.log("app");
})

.controller('LoginCtrl', function($scope, $http, transformRequestAsFormPost) {
	console.log("login");

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {
			"username":"root",
			"password":"root"
		};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('AJAX call to login', $scope.loginData);
		var data = $scope.loginData;
		data.cmd = "login";

		$http({
			method: 'post',
			url: './api/',
			data: data,
			headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
			transformRequest: transformRequestAsFormPost,
		}).then(function successCallback(response) {
			console.log(response);

			var json = response.data;
			alert(json.message);

		}, function errorCallback(response) {
			var json = response.data;
			alert(json.message);
		});
	};
});
