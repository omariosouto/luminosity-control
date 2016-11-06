app.controller('clientesController', ['$scope', '$location', 'clientes', 'clientesAPI', function($scope, $location, clientes, clientesAPI){

	// classes de Scopo
	$scope.pageTitle = 'Clientes';
	$scope.classe = 'selected';

	$scope.clientes = clientes.data;

	$scope.nivelAcesso = [
		{nome: "Cliente", valor: 0},
		{nome: "Supervisor", valor: 1}
	];

	//Create
	$scope.adicionarCliente = function(manipularCliente) {
		manipularCliente.CLI_DAT_REGISTRO =  new Date();
		
		clientesAPI.addCliente(manipularCliente).then(function(data){
			console.log(data);
			delete $scope.manipularCliente;
			$scope.clienteForm.$setPristine();
			carregarClientes();
			$('#modal1').closeModal();
			// Toast
			var $toastContent = $('<span>Cadastrado com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');
		}).catch(function(response, status) {

			// Toast
			var $toastContent = $('<span>' + response.data + '</span>');
			Materialize.toast($toastContent, 5000, 'red darken-2');

		});
	}
	// Read
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

	// Delete
	$scope.apagarCliente = function(clientes) {


		var clientesSelecionados = clientes.filter(function(cliente){
			if(cliente.selecionado) {
				return cliente; 
			}
		});

		for (var i = clientesSelecionados.length - 1; i >= 0; i--) {

			clientesAPI.deleteCliente(clientesSelecionados[i].CLI_INT_ID).then(function(data){
				console.log(data);
				carregarClientes();
				//var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				Materialize.toast($toastContent, 5000, 'green darken-2');
			}).catch(function(response, status) {

				// Toast
				var $toastContent = $('<span>' + response.data + '</span>');
				Materialize.toast($toastContent, 5000, 'red darken-2');

			});
		}

	}

	// Update
	$scope.alterarCliente = function(manipularCliente) {
		
		console.log("Atual");
		console.log(manipularCliente);
		
		clientesAPI.updateCliente(manipularCliente).then(function(data){
			console.log("Response");
			console.log(data);
			$scope.clienteForm.$setPristine();
			carregarClientes();

			$('#modal1').closeModal();
			// Toast
			var $toastContent = $('<span>Alteração concluída com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');


		}).catch(function(response, status) {
			// Toast
			var $toastContent = $('<span>' + response.data + '</span>');
			Materialize.toast($toastContent, 5000, 'red darken-2');

		});
	}

	$scope.ordernarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}
	

	$scope.isClienteSelecionado = function(clientes) {
		return clientes.some(function(cliente){
			return cliente.selecionado;
		});
	}

	$scope.abrirModal = function(cliente,acao) {
		console.log("Cliente: ");
		console.log(cliente);
		if(acao == 0) {
			$scope.manipularClienteTitle = "Alterar funcionário: ";
			$scope.btnAcao = true;


			console.log(cliente.CLI_DAT_NASCIMENTO);

			$scope.manipularCliente = cliente;
		}
		if(acao == 1) {
			$scope.manipularClienteTitle = "Cadastrar funcionário: ";
			$scope.btnAcao = false;
			$scope.manipularCliente = {};
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


	//carregarClientes();
}]);
