var app = angular.module('myApp', ['ui.bootstrap','appClient'/*, "ngAnimate"*/]);

app.controller('mainController', function($scope, $http) {
	/*LOGICA*/
	$scope.obtener = function (){
		$http.get('/prueba').success(function(data) {
		$scope.datos = data;
		console.log(data)
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});
	};
});

