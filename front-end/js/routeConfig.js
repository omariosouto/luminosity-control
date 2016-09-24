// Routes Config
app.config(function($routeProvider) {
	$routeProvider
		//route for the home page
		.when('/', {
			templateUrl : 'view/pages/login.html',
			controller  : 'loginController',
			resolve: {

				loginAuth: function($location) {
					if(window.localStorage['loginToken']) {
						return $location.url('/clientes');
					}
				}

			}
		})
		.when('/logout', {
			templateUrl : 'view/pages/blank.html',
			controller  : 'logoutController',
			resolve: {
				loginAuth: function($location) {
					if(!window.localStorage['loginToken']) {
						return $location.url('/');
					}
				}
			}
		})
		.when('/pedidos', {
			templateUrl : 'view/pages/pedidos.html',
			controller  : 'pedidosController',
			resolve: {
				pedidos: function(pedidosAPI) {
					return pedidosAPI.getPedidos();
				},
				loginAuth: function($location) {
					if(!window.localStorage['loginToken']) {
						return $location.url('/');
					}
				}
			}
		})
		.when('/clientes', {
			templateUrl : 'view/pages/clientes.html',
			controller  : 'clientesController',
			resolve: {
				clientes: function(clientesAPI) {
					return clientesAPI.getClientes();
				},
				loginAuth: function($location) {
					if(!window.localStorage['loginToken']) {
						return $location.url('/');
					}
				}
			}
		})
		.when('/veiculos', {
			templateUrl : 'view/pages/veiculos.html',
			controller  : 'veiculosController',
			resolve: {
				veiculos: function(veiculosAPI) {
					return veiculosAPI.getVeiculos();
				},
				loginAuth: function($location) {
					if(!window.localStorage['loginToken']) {
						return $location.url('/');
					}
				}
			}
		})
		.when('/funcionarios', {
			templateUrl : 'view/pages/funcionarios.html',
			controller  : 'funcionariosController',
			resolve: {
				funcionarios: function(funcionariosAPI) {
					return funcionariosAPI.getFuncionarios();
				},
				loginAuth: function($location) {
					if(!window.localStorage['loginToken']) {
						return $location.url('/');
					}
				}
			}
		})
		$routeProvider.otherwise({redirectTo: "/"})
});