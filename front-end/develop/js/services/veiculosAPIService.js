/*
 - Factory function faz uma invocação e tem um objeto de retorno
*/
app.factory('veiculosAPI', ['$http', 'config', function($http, config){
	var _getveiculos = function() {
		return $http.get( config.baseURL + 'public/veiculos/');
	};

	var _getVeiculosByStatus = function(status) {
		return $http.get( config.baseURL + 'public/veiculos?status=' + status);
	};

	var _addveiculo = function(veiculo) {
		return $http.post( config.baseURL + 'public/veiculos', veiculo);
	};

	var _updateveiculo = function(veiculo) {
		return $http.put( config.baseURL + 'public/veiculos', veiculo);
	};

	var _deleteveiculo = function(veiculoId) {
		return $http.delete( config.baseURL + 'public/veiculos?veiculoId=' + veiculoId);
	};


	return {
		getVeiculos: _getveiculos,
		getVeiculosByStatus: _getVeiculosByStatus,
		addVeiculo: _addveiculo,
		updateVeiculo: _updateveiculo,
		deleteVeiculo: _deleteveiculo
	};
}])