app.controller('pedidosController', ['$scope', '$location', 'pedidos', 'pedidosAPI', 'funcionariosAPI', 'clientesAPI', 'veiculosAPI', function($scope, $location, pedidos, pedidosAPI, funcionariosAPI, clientesAPI, veiculosAPI){

	// classes de Scopo
	$scope.pageTitle = 'Pedidos';
	$scope.classe = 'selected';
	$scope.pedidos = pedidos.data; // Carregar Pedidos


	/*
		*
		* FUNÇÕES DE CARREGAMENTO 
		*
	*/
	// Carregar Pedidos
	var carregarPedidos = function() {

		pedidosAPI.getPedidos().then(function(data) {
			$scope.pedidos = data.data;
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar funcionarios:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	// Carregar Funcionários
	var carregarFuncionarios = function() {

		funcionariosAPI.getFuncionarios().then(function(data) {
			$scope.funcionarios = data.data;
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar funcionarios:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	// Carregar Clientes
	var carregarClientes = function() {

		clientesAPI.getClientes().then(function(data) {
			$scope.clientes = data.data;
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar clientes:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	// Carregar Veiculos
	var carregarVeiculos = function() {

		veiculosAPI.getVeiculos().then(function(data) {
			$scope.veiculos = data.data;
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar Veículos:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	carregarFuncionarios(); //Carregar Funcionários
	carregarClientes(); //Carregar Funcionários
	carregarVeiculos(); //Carregar Funcionários


	/*
		*
		* FUNÇÕES DE CARREGAMENTO 
		*
	*/

	/*
		*
		* FUNÇÕES DE LIMPAR RADIO BUTTON
		*
	*/

	$scope.cleanRadioFuncionario = function(funcionarios, currID, currNome, currSobrenome) {
		console.log("teste radio");
		console.log(currID);
		var funcionariosSelecionados = funcionarios.filter(function(funcionario){
			if(funcionario.selecionado && currID && currNome && currSobrenome) {

				$scope.manipularPedido.FUN_INT_ID = currID;
				$scope.manipularPedido.Funcionario.FUN_STR_NOME = currNome;
				$scope.manipularPedido.Funcionario.FUN_STR_SOBRENOME = currSobrenome;
				if(funcionario.FUN_INT_ID != currID) {
					return funcionario.selecionado = false ; 	
				}
			}
		});
	};

	$scope.cleanRadioCliente = function(cliente, currID, currNome, currSobrenome) {
		console.log("teste radio");
		console.log(currID);
		var clientesSelecionados = clientes.filter(function(cliente){
			if(cliente.selecionado && currID && currNome && currSobrenome) {

				$scope.manipularPedido.CLI_INT_ID = currID;
				$scope.manipularPedido.Cliente.CLI_STR_NOME = currNome;
				$scope.manipularPedido.Cliente.CLI_STR_SOBRENOME = currSobrenome;
				if(cliente.CLI_INT_ID != currID) {
					return cliente.selecionado = false ; 	
				}
			}
		});
	};

	$scope.cleanRadioVeiculo = function(veiculo, currID, currNome, currSobrenome) {
		console.log("teste radio");
		console.log(currID);
		var clientesSelecionados = veiculo.filter(function(veiculo){
			if(veiculo.selecionado && currID && currNome && currSobrenome) {

				$scope.manipularPedido.VEI_INT_ID = currID;
				$scope.manipularPedido.Veiculo.VEI_STR_MARCA = currNome;
				$scope.manipularPedido.Veiculo.VEI_STR_MODELO = currSobrenome;
				if(veiculo.VEI_INT_ID != currID) {
					return veiculo.selecionado = false ; 	
				}
			}
		});
	};

	/*
		*
		* FUNÇÕES DE LIMPAR RADIO BUTTON
		*
	*/


	/*
		*
		* FUNÇÕES DE MANIPULAÇÃO DE PEDIDO
		*
	*/

	$scope.adicionarPedido = function(manipularPedido) {
		manipularPedido.PED_DAT_REGISTRO =  new Date();
		console.log("Atual");
		
		// Reset Virtual Params
		manipularPedido.Cliente = null;
		manipularPedido.Funcionario = null;
		manipularPedido.Veiculo = null;

		pedidosAPI.addPedido(manipularPedido).success(function(data){
			console.log(data);
			delete $scope.manipularPedido;
			$scope.pedidoForm.$setPristine();
			carregarPedidos();

			$('#modal1').closeModal();

			var $toastContent = $('<span>Pedido adicionado com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');
		});
	}

	$scope.alterarPedido = function(manipularPedido) {
		console.log("Atual");
		console.log(manipularPedido);

		// Reset Virtual Params
		manipularPedido.Cliente = null;
		manipularPedido.Funcionario = null;
		manipularPedido.Veiculo = null;
		
		pedidosAPI.updatePedido(manipularPedido).success(function(data){
			console.log("Response");
			console.log(data);
			$scope.pedidoForm.$setPristine();
			carregarPedidos();

			$('#modal1').closeModal();
			// Toast
			var $toastContent = $('<span>Alteração concluída com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');


		});
	}

	$scope.apagarPedido = function(pedidos) {


		var pedidosSelecionados = pedidos.filter(function(pedido){
			if(pedido.selecionado) {
				console.log(pedido)
				return pedido; 
			}
		});

		for (var i = pedidosSelecionados.length - 1; i >= 0; i--) {

			pedidosAPI.deletePedido(pedidosSelecionados[i].PED_INT_ID).success(function(data){
				console.log(data);
				carregarPedidos();
				//var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				Materialize.toast($toastContent, 5000, 'green darken-2');
			});
		}

	}

	/*
		*
		* FUNÇÕES DE MANIPULAÇÃO DE PEDIDO
		*
	*/

	$scope.isFuncionarioSelecionado = function(funcionarios) {
		return funcionarios.some(function(funcionario){
			return !funcionario.selecionado;
		});
	}
	$scope.cleanRadioCliente = function(cliente, currID, currNome, currSobrenome) {
		console.log("teste radio");
		console.log(currID);
		var funcionariosSelecionados = cliente.filter(function(cliente){
			if(cliente.selecionado && currID && currNome && currSobrenome) {

				$scope.manipularPedido.CLI_INT_ID = currID;
				$scope.manipularPedido.Cliente.CLI_STR_NOME = currNome;
				$scope.manipularPedido.Cliente.CLI_STR_SOBRENOME = currSobrenome;
				if(cliente.CLI_INT_ID != currID) {
					return cliente.selecionado = false ; 	
				}
			}
		});
	};


	$scope.apagarFuncionario = function(funcionarios) {
		console.log("teste");
		var funcionariosSelecionados = funcionarios.filter(function(funcionario){
			if(funcionario.selecionado) {
				console.log(funcionario);
				return funcionario; 
			}
		});
	};

	// - Abrir Modal
	$scope.abrirModal = function(pedido,acao) {

		funcionarios = $scope.funcionarios;
		clientes = $scope.clientes;
		veiculos = $scope.veiculos;

		if(acao == 0) {
			$scope.manipularPedidoTitle = "Alterar Pedido: ";
			$scope.btnAcao = true;
			currFunID = pedido.Funcionario.FUN_INT_ID;
			currCliID = pedido.Cliente.CLI_INT_ID;
			currVeiID = pedido.Veiculo.VEI_INT_ID;
			console.log("Fun: " + currFunID);
			console.log("Cli: " + currCliID);
			console.log("Vei: " + currVeiID);


			var funcionariosSelecionados = funcionarios.filter(function(funcionario){
				if(funcionario.FUN_INT_ID == currFunID) {
					console.log(funcionario.selecionado = true);
				} else {
					console.log(funcionario.selecionado = false);
				}
			});

			var clientesSelecionados = clientes.filter(function(cliente){
				if(cliente.CLI_INT_ID == currCliID) {
					console.log(cliente.selecionado = true);
				} else {
					console.log(cliente.selecionado = false);
				}
			});

			var veiculosSelecionados = veiculos.filter(function(veiculo){
				if(veiculo.VEI_INT_ID == currVeiID) {
					console.log(veiculo.selecionado = true);
				} else {
					console.log(veiculo.selecionado = false);
				}
			});


			$scope.manipularPedido = pedido;
		}
		if(acao == 1) {
			$scope.manipularPedidoTitle = "Cadastrar Pedido: ";
			$scope.btnAcao = false;
			console.log($scope.manipularPedido);
			$scope.manipularPedido = {};
			$scope.manipularPedido.Funcionario = {};
			$scope.manipularPedido.Cliente = {};
			$scope.manipularPedido.Veiculo = {};
			var funcionariosSelecionados = funcionarios.filter(function(funcionario){
				funcionario.selecionado = false;
			});
			var clientesSelecionados = clientes.filter(function(cliente){
				cliente.selecionado = false;
			});
			var veiculosSelecionados = veiculos.filter(function(veiculo){
				veiculo.selecionado = false;
			});
		}
		$('#modal1').openModal();
	};

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
