app.controller('loginController', ['$scope', '$location', 'funcionariosAPI', '$timeout', 'loginAuth', function($scope, $location, funcionariosAPI, $timeout, loginAuth){


console.log(loginAuth);

/*
	- Timer
*/
$scope.clock = "Carregando..."; // initialise the time variable
$scope.tickInterval = 1000 //ms
var tick = function() {
    $scope.clock = Date.now() // get the current time
    $timeout(tick, $scope.tickInterval); // reset the timer
}
// Start the timer
$timeout(tick, $scope.tickInterval);

$scope.manipularFuncionario = {
	FUN_STR_EMAIL: "marioteste@gmail.com",	
	FUN_STR_SENHA: "teste12",	
};

$scope.login = function(manipularFuncionario) {
	console.log(manipularFuncionario.FUN_STR_EMAIL);
	console.log(manipularFuncionario.FUN_STR_SENHA);

	funcionariosAPI.loginFuncionario(manipularFuncionario).then(function(response) {
		// Sucesso
		//console.log(data);
		var loginToken = {email: manipularFuncionario.FUN_STR_EMAIL, hash: response.data};
		window.localStorage['loginToken'] = angular.toJson(loginToken);
		console.log(window.localStorage[loginToken]);
		$location.url('/clientes');


	}).catch(function(response, status){
		// Erro
		console.log(response);
		console.log(status);
		var $toastContent = $('<span>' + response.data + '</span>');
		Materialize.toast($toastContent, 5000, 'red darken-2');

	});
}

	// - Components
	$(document).ready(function(){
		$(".button-collapse").sideNav();
		// Modal
		$('.modal-trigger').leanModal();
		// ./Modal
	});

	$(".close-menu").on("click", function() {
	    $("#sidenav-overlay").trigger("click");
	});

}]);
