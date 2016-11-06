app.controller('pedidosController', ['$scope', '$location', '$filter', 'pedidos', 'pedidosAPI', 'funcionariosAPI', 'clientesAPI', 'veiculosAPI', function($scope, $location, $filter, pedidos, pedidosAPI, funcionariosAPI, clientesAPI, veiculosAPI){

	// classes de Scopo
	$scope.pageTitle = 'Pedidos';
	$scope.classe = 'selected';
	$scope.pedidos = pedidos.data; // Carregar Pedidos

	$scope.statusAcesso = [
		{nome: "CAN - Cancelado", valor: "C"},
		{nome: "ALU - Alugado", valor: "A"},
		{nome: "FIN - Finalizado", valor: "F"}
	];

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
			console.log('Carregou Clientes: ', $scope.clientes);
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar clientes:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	// Carregar Veiculos
	var carregarVeiculos = function() {

		veiculosAPI.getVeiculosByStatus("D").then(function(data) {
			$scope.veiculos = data.data;
			$scope.requestStatus = data.status;
			//console.log("Veiculos carregados");
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

	$scope.cleanRadioVeiculo = function(veiculo, currID, VEI_STR_MARCA, VEI_STR_MODELO, VEI_STR_KM, VEI_DAT_ANO, VEI_STR_PLACA, VEI_STR_STATUS, VEI_DAT_REGISTRO) {
		console.log("Veiculo: ");
		var clientesSelecionados = veiculo.filter(function(veiculo){
			if(veiculo.selecionado && currID) {

				$scope.manipularPedido.VEI_INT_ID 				= currID;
				$scope.manipularPedido.Veiculo 					= {};
				$scope.manipularPedido.Veiculo.VEI_INT_ID		= currID;
				$scope.manipularPedido.Veiculo.VEI_STR_MARCA	= VEI_STR_MARCA;
				$scope.manipularPedido.Veiculo.VEI_STR_MODELO	= VEI_STR_MODELO;
				$scope.manipularPedido.Veiculo.VEI_STR_KM		= VEI_STR_KM;
				$scope.manipularPedido.Veiculo.VEI_DAT_ANO		= VEI_DAT_ANO;
				$scope.manipularPedido.Veiculo.VEI_STR_PLACA	= VEI_STR_PLACA;
				$scope.manipularPedido.Veiculo.VEI_STR_STATUS	= VEI_STR_STATUS;
				$scope.manipularPedido.Veiculo.VEI_DAT_REGISTRO	= VEI_DAT_REGISTRO;

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
		//manipularPedido.Veiculo = null;


		// Data Atual
		var currDate = $filter('date')(new Date(), 'yyyy-MM-dd');
		currDate = currDate.split("-");
		console.log(currDate[2]);
		currDate = new Date(currDate[0], currDate[1] - 1, currDate[2]);

		// Data de Retorno
		manipularPedido.PED_DAT_RETORNO = $filter('date')(manipularPedido.PED_DAT_RETORNO, 'yyyy-MM-dd');
		manipularPedido.PED_DAT_RETORNO = manipularPedido.PED_DAT_RETORNO.split("-");
		manipularPedido.PED_DAT_RETORNO = new Date(manipularPedido.PED_DAT_RETORNO[0], manipularPedido.PED_DAT_RETORNO[1] - 1, manipularPedido.PED_DAT_RETORNO[2]);

		console.log(currDate);
		console.log(manipularPedido.PED_DAT_RETORNO);

		if( manipularPedido.PED_DAT_RETORNO >= currDate ) {
			console.log("Maior que data atual");
		} else {
			console.log("Menor que data atual");
			// Toast
			var $toastContent = $('<span>A data de retorno precisa ser: <strong>após</strong> ou <strong>no mesmo dia</strong> da data de registro</span>');
			Materialize.toast($toastContent, 5000, 'red darken-2');
			return false;
		}

		if(manipularPedido.PED_STR_STATUS == "A") { // Alugado
			manipularPedido.Veiculo.VEI_STR_STATUS = "A";
		}
		if(manipularPedido.PED_STR_STATUS == "C") { // Cancelado
			manipularPedido.Veiculo.VEI_STR_STATUS = "D";		
		}
		if(manipularPedido.PED_STR_STATUS == "F") { // Finalizado
			manipularPedido.Veiculo.VEI_STR_STATUS = "D";
		}


		//console.log(manipularPedido);
		//console.log(manipularPedido.Veiculo);

		pedidosAPI.addPedido(manipularPedido).then(function(data){
			console.log(data);
			delete $scope.manipularPedido;
			$scope.pedidoForm.$setPristine();
			carregarPedidos();
			carregarVeiculos();
			carregarClientes();

			$('#modal1').closeModal();

			var $toastContent = $('<span>Pedido adicionado com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');
		}).catch(function(response, status) {

			// Toast
			var $toastContent = $('<span>' + response.data + '</span>');
			Materialize.toast($toastContent, 5000, 'red darken-2');

		});
	}

	$scope.alterarPedido = function(manipularPedido) {
		console.log("Atual");
		console.log(manipularPedido);
		console.log("Veículo: ");

		// Data Atual
		var currDate = $filter('date')(new Date(), 'yyyy-MM-dd');
		currDate = currDate.split("-");
		console.log(currDate[2]);
		currDate = new Date(currDate[0], currDate[1] - 1, currDate[2]);

		// Data de Retorno
		manipularPedido.PED_DAT_RETORNO = $filter('date')(manipularPedido.PED_DAT_RETORNO, 'yyyy-MM-dd');
		manipularPedido.PED_DAT_RETORNO = manipularPedido.PED_DAT_RETORNO.split("-");
		manipularPedido.PED_DAT_RETORNO = new Date(manipularPedido.PED_DAT_RETORNO[0], manipularPedido.PED_DAT_RETORNO[1] - 1, manipularPedido.PED_DAT_RETORNO[2]);

		console.log(currDate);
		console.log(manipularPedido.PED_DAT_RETORNO);

		if( manipularPedido.PED_DAT_RETORNO >= currDate ) {
			console.log("Maior que data atual");
		} else {
			console.log("Menor que data atual");
			// Toast
			var $toastContent = $('<span>A data de retorno precisa ser: <strong>após</strong> ou <strong>no mesmo dia</strong> da data de registro</span>');
			Materialize.toast($toastContent, 5000, 'red darken-2');
			return false;
		}

		if(manipularPedido.PED_STR_STATUS == "A") { // Alugado
			manipularPedido.Veiculo.VEI_STR_STATUS = "A";
		}
		if(manipularPedido.PED_STR_STATUS == "C") { // Cancelado
			manipularPedido.Veiculo.VEI_STR_STATUS = "D";
		}
		if(manipularPedido.PED_STR_STATUS == "F") { // Finalizado
			manipularPedido.Veiculo.VEI_STR_STATUS = "D";
		}

		// Reset Virtual Params
		manipularPedido.Cliente = null;
		manipularPedido.Funcionario = null;
		//manipularPedido.Veiculo = null;
		

		pedidosAPI.updatePedido(manipularPedido).then(function(data){
			console.log("Response");
			console.log(data);
			$scope.pedidoForm.$setPristine();
			carregarPedidos();
			carregarVeiculos();
			carregarClientes();

			$('#modal1').closeModal();
			// Toast
			var $toastContent = $('<span>Alteração concluída com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');


		}).catch(function(data, status) {
			// Toast
			var $toastContent = $('<span>Falha ao alterar pedido!</span>');
			Materialize.toast($toastContent, 5000, 'red darken-2');
		});
	}

	$scope.ordernarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}

	$scope.apagarPedido = function(pedidos) {


		try {


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

			console.log( carregarPedidos() );
			console.log( carregarVeiculos() );
			console.log( carregarClientes() );

		} catch(e) {

			console.log(e);

		} finally {

			setTimeout(function(){ location.reload(); }, 3000);
			
		}


	}

	/*
		*
		* FUNÇÕES DE MANIPULAÇÃO DE PEDIDO
		*
	*/

	$scope.isPedidoSelecionado = function(pedidos) {
		return pedidos.some(function(pedido){
			return pedido.selecionado;
		});
	}
	$scope.cleanRadioCliente = function(cliente, currID, currNome, currSobrenome) {
		console.log("Cliente:");
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
		

		//carregarVeiculos(); //Carregar Funcionários
		//carregarFuncionarios(); //Carregar Funcionários
		//carregarClientes(); //Carregar Funcionários

		console.log('Console Log Clientes: ', $scope.clientes[1].selecionado = true);
		
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

				if(pedido.PED_STR_STATUS == "C") { // Cancelado
					// Toast
					var $toastContent = $('<span>Por questões de segurança, não é possível alterar pedidos cancelados.</span>');
					Materialize.toast($toastContent, 5000, 'red darken-2');
					return false;
				}

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
			$scope.manipularPedido.PED_STR_STATUS = "A";
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

	// Fecha Modal
	$scope.closeModal = function() {
		console.log("click");
		$('#modal1').closeModal();
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
