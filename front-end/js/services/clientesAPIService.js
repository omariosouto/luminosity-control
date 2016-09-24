/*
 - Factory function faz uma invocação e tem um objeto de retorno
*/
app.factory('clientesAPI', ['$http', 'config', function($http, config){
	var _getclientes = function() {
		return $http.get( config.baseURL + 'public/clientes/');
	};

	var _addcliente = function(cliente) {
		return $http.post( config.baseURL + 'public/clientes', cliente);
	};

	var _updatecliente = function(cliente) {
		return $http.put( config.baseURL + 'public/clientes', cliente);
	};

	var _deletecliente = function(clienteId) {
		return $http.delete( config.baseURL + 'public/clientes?clienteId=' + clienteId);
	};


	return {
		getClientes: _getclientes,
		addCliente: _addcliente,
		updateCliente: _updatecliente,
		deleteCliente: _deletecliente
	};
}])