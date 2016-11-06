app.controller('veiculosController', ['$scope', '$location', 'veiculos', 'veiculosAPI', function($scope, $location, veiculos, veiculosAPI){

	// classes de Scopo
	$scope.pageTitle = 'Veiculos';
	$scope.classe = 'selected';

	$scope.veiculos = veiculos.data;

	$scope.statusAcesso = [
		{nome: "D - Disponível", valor: "D"},
		{nome: "A - Alugado", valor: "A"}
	];

	//Create
	$scope.adicionarVeiculo = function(manipularVeiculo) {
		manipularVeiculo.VEI_DAT_REGISTRO =  new Date();

		console.log(manipularVeiculo);
		veiculosAPI.addVeiculo(manipularVeiculo).then(function(data){
			delete $scope.manipularVeiculo;
			$scope.veiculoForm.$setPristine();
			carregarVeiculos();
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
	var carregarVeiculos = function() {

		veiculosAPI.getVeiculos().then(function(data) {
			$scope.veiculos = data.data;
			$scope.requestStatus = data.status;
		})
		.catch(function(data, status) {
			console.log('Erro ao carregar veiculos:', data.status, data.data);
			$scope.requestStatus = data.status;
		})
	};

	// Delete
	$scope.apagarVeiculo = function(veiculos) {


		//ATUALIZAR TUDO

		var veiculosSelecionados = veiculos.filter(function(veiculo){
			if(veiculo.selecionado) {
				return veiculo; 
			}
		});

		for (var i = veiculosSelecionados.length - 1; i >= 0; i--) {

			veiculosAPI.deleteVeiculo(veiculosSelecionados[i].VEI_INT_ID).then(function(data){
				console.log(data);
				carregarVeiculos();
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
	$scope.alterarVeiculo = function(manipularVeiculo) {
		
		console.log("Atual");
		console.log(manipularVeiculo);
		
		veiculosAPI.updateVeiculo(manipularVeiculo).then(function(data){
			console.log("Response");
			console.log(data);
			$scope.veiculoForm.$setPristine();
			carregarVeiculos();

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
	

	$scope.isVeiculoSelecionado = function(veiculos) {
		return veiculos.some(function(veiculo){
			return veiculo.selecionado;
		});
	}

	$scope.abrirModal = function(veiculo,acao) {
		console.log("Veiculo: ");
		console.log(veiculo);
		console.log(acao);
		if(acao == 0) {
			$scope.manipularVeiculoTitle = "Alterar funcionário: ";
			$scope.btnAcao = true;

			$scope.manipularVeiculo = veiculo;
		}
		if(acao == 1) {
			$scope.manipularVeiculoTitle = "Cadastrar funcionário: ";
			$scope.btnAcao = false;
			$scope.manipularVeiculo = {};
			$scope.hideFields = true;
			$scope.manipularVeiculo.VEI_STR_STATUS = "D";
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


	//carregarVeiculos();
}]);
