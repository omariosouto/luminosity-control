app.controller('logoutController', ['$scope', '$location', 'funcionariosAPI', '$timeout', 'loginAuth', function($scope, $location, funcionariosAPI, $timeout, loginAuth){

if(window.localStorage['loginToken']) {
	delete window.localStorage['loginToken'];
	$location.url('/');
} else {
	$location.url('/clientes');
}

}]);
