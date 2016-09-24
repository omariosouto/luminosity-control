app.controller('veiculosController', ['$scope', '$location', 'veiculos', 'veiculosAPI', function($scope, $location, veiculos, veiculosAPI){

	// classes de Scopo
	$scope.pageTitle = 'Veículos';
	$scope.classe = 'selected';

	$scope.veiculos = veiculos.data;

	$scope.statusAcesso = [
		{nome: "D - Disponível", valor: "D"},
		{nome: "A - Alugado", valor: "A"}
	];

	//Create
	$scope.adicionarveiculo = function(manipularveiculo) {
		manipularveiculo.FUN_DAT_REGISTRO =  new Date();
		
		veiculosAPI.addVeiculo(manipularveiculo).success(function(data){
			console.log(data);
			delete $scope.manipularveiculo;
			$scope.veiculoForm.$setPristine();
			carregarveiculos();
			var $toastContent = $('<span>Cadastrado com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');
		});
	}
	// Read
	var carregarveiculos = function() {

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
	$scope.apagarveiculo = function(veiculos) {


		var veiculosSelecionados = veiculos.filter(function(veiculo){
			if(veiculo.selecionado) {
				return veiculo; 
			}
		});

		for (var i = veiculosSelecionados.length - 1; i >= 0; i--) {

			veiculosAPI.deleteVeiculo(veiculosSelecionados[i].FUN_INT_ID).success(function(data){
				console.log(data);
				carregarveiculos();
				//var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				Materialize.toast($toastContent, 5000, 'green darken-2');
			});
		}

	}

	// Update
	$scope.alterarveiculo = function(manipularveiculo) {
		
		console.log("Atual");
		console.log(manipularveiculo);
		
		veiculosAPI.updateVeiculo(manipularveiculo).success(function(data){
			console.log("Response");
			console.log(data);
			$scope.veiculoForm.$setPristine();
			carregarveiculos();

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
	

	$scope.isveiculoSelecionado = function(veiculos) {
		return veiculos.some(function(veiculo){
			console.log(veiculo.selecionado);
			return !veiculo.selecionado;
		});
	}

	$scope.abrirModal = function(veiculo,acao) {
		console.log("veiculo: ");
		console.log(veiculo);
		if(acao == 0) {
			$scope.manipularveiculoTitle = "Alterar funcionário: ";
			$scope.btnAcao = true;


			console.log(veiculo.FUN_DAT_NASCIMENTO);

			$scope.manipularveiculo = veiculo;
		}
		if(acao == 1) {
			$scope.manipularveiculoTitle = "Cadastrar funcionário: ";
			$scope.btnAcao = false;
			$scope.manipularveiculo = {};
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

	//carregarveiculos();
}]);
