/*
 - Factory function faz uma invocação e tem um objeto de retorno
*/
app.factory('funcionariosAPI', ['$http', 'config', function($http, config){
	var _getFuncionarios = function() {
		return $http.get( config.baseURL + 'public/funcionarios/');
	};

	var _addFuncionario = function(funcionario) {
		return $http.post( config.baseURL + 'public/funcionarios', funcionario);
	};

	var _updateFuncionario = function(funcionario) {
		return $http.put( config.baseURL + 'public/funcionarios', funcionario);
	};

	var _deleteFuncionario = function(funcionarioId) {
		return $http.delete( config.baseURL + 'public/funcionarios?funcionarioId=' + funcionarioId);
	};

	var _loginFuncionario = function(funcionarioLogin) {
		return $http.post( config.baseURL + 'public/funcionarios/login', funcionarioLogin);
	};


	return {
		getFuncionarios: _getFuncionarios,
		addFuncionario: _addFuncionario,
		updateFuncionario: _updateFuncionario,
		deleteFuncionario: _deleteFuncionario,
		loginFuncionario: _loginFuncionario
	};
}])