app.controller('clientesController', ['$scope', '$location', 'clientes', 'clientesAPI', function($scope, $location, clientes, clientesAPI){

	// classes de Scopo
	$scope.pageTitle = 'Clientes';
	$scope.classe = 'selected';

	$scope.clientes = clientes.data;

	$scope.nivelAcesso = [
		{nome: "Funcionário", valor: 0},
		{nome: "Supervisor", valor: 1}
	];

	//Create
	$scope.adicionarcliente = function(manipularcliente) {
		manipularcliente.FUN_DAT_REGISTRO =  new Date();
		
		clientesAPI.addCliente(manipularcliente).success(function(data){
			console.log(data);
			delete $scope.manipularcliente;
			$scope.clienteForm.$setPristine();
			carregarclientes();
			var $toastContent = $('<span>Cadastrado com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');
		});
	}
	// Read
	var carregarclientes = function() {

		clientesAPI.getClientes().then(function(data) {
			$scope.clientes = data.data;
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar clientes:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	// Delete
	$scope.apagarcliente = function(clientes) {


		var clientesSelecionados = clientes.filter(function(cliente){
			if(cliente.selecionado) {
				return cliente; 
			}
		});

		for (var i = clientesSelecionados.length - 1; i >= 0; i--) {

			clientesAPI.deleteCliente(clientesSelecionados[i].FUN_INT_ID).success(function(data){
				console.log(data);
				carregarclientes();
				//var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				Materialize.toast($toastContent, 5000, 'green darken-2');
			});
		}

	}

	// Update
	$scope.alterarcliente = function(manipularcliente) {
		
		console.log("Atual");
		console.log(manipularcliente);
		
		clientesAPI.updateCliente(manipularcliente).success(function(data){
			console.log("Response");
			console.log(data);
			$scope.clienteForm.$setPristine();
			carregarclientes();

			$('#modal1').closeModal();
			// Toast
			var $toastContent = $('<span>Alteração concluída com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');


		});
	}

	$scope.ordernarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}
	

	$scope.isclienteSelecionado = function(clientes) {
		return clientes.some(function(cliente){
			console.log(cliente.selecionado);
			return !cliente.selecionado;
		});
	}

	$scope.abrirModal = function(cliente,acao) {
		console.log("cliente: ");
		console.log(cliente);
		if(acao == 0) {
			$scope.manipularclienteTitle = "Alterar funcionário: ";
			$scope.btnAcao = true;


			console.log(cliente.FUN_DAT_NASCIMENTO);

			$scope.manipularcliente = cliente;
		}
		if(acao == 1) {
			$scope.manipularclienteTitle = "Cadastrar funcionário: ";
			$scope.btnAcao = false;
			$scope.manipularcliente = {};
		}
		$('#modal1').openModal();
	};

	// - Components
	$(document).ready(function(){
		//$('.collapsible').collapsible({
		//	accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		//});
		$(".button-collapse").sideNav();
		// Modal
		$('.modal-trigger').leanModal();
		// ./Modal
	});

	$(".close-menu").on("click", function() {
	    $("#sidenav-overlay").trigger("click");
	});

	//carregarclientes();
}]);
