/*
 - Factory function faz uma invocação e tem um objeto de retorno
*/
app.factory('pedidosAPI', ['$http', 'config', function($http, config){
	var _getpedidos = function() {
		return $http.get( config.baseURL + 'public/pedidos/');
	};

	var _addpedido = function(pedido) {
		return $http.post( config.baseURL + 'public/pedidos', pedido);
	};

	var _updatepedido = function(pedido) {
		return $http.put( config.baseURL + 'public/pedidos', pedido);
	};

	var _deletepedido = function(pedidoId) {
		return $http.delete( config.baseURL + 'public/pedidos?pedidoId=' + pedidoId);
	};


	return {
		getPedidos: _getpedidos,
		addPedido: _addpedido,
		updatePedido: _updatepedido,
		deletePedido: _deletepedido
	};
}])