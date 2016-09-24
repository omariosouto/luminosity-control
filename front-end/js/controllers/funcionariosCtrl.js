app.controller('funcionariosController', ['$scope', '$location', 'funcionarios', 'funcionariosAPI', function($scope, $location, funcionarios, funcionariosAPI){

	// classes de Scopo
	$scope.pageTitle = 'Funcionários';
	$scope.classe = 'selected';

	$scope.funcionarios = funcionarios.data;

	$scope.nivelAcesso = [
		{nome: "Funcionário", valor: 0},
		{nome: "Supervisor", valor: 1}
	];

	//Create
	$scope.adicionarFuncionario = function(manipularFuncionario) {
		manipularFuncionario.FUN_DAT_REGISTRO =  new Date();
		
		funcionariosAPI.addFuncionario(manipularFuncionario).success(function(data){
			console.log(data);
			delete $scope.manipularFuncionario;
			$scope.funcionarioForm.$setPristine();
			carregarFuncionarios();
			var $toastContent = $('<span>Cadastrado com Sucesso!</span>');
			Materialize.toast($toastContent, 5000, 'green darken-2');
		});
	}
	// Read
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

	// Delete
	$scope.apagarFuncionario = function(funcionarios) {


		var funcionariosSelecionados = funcionarios.filter(function(funcionario){
			if(funcionario.selecionado) {
				return funcionario; 
			}
		});

		for (var i = funcionariosSelecionados.length - 1; i >= 0; i--) {

			funcionariosAPI.deleteFuncionario(funcionariosSelecionados[i].FUN_INT_ID).success(function(data){
				console.log(data);
				carregarFuncionarios();
				//var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				var $toastContent = $('<span>Remoção concluída com Sucesso!</span>');
				Materialize.toast($toastContent, 5000, 'green darken-2');
			});
		}

	}

	// Update
	$scope.alterarFuncionario = function(manipularFuncionario) {
		
		console.log("Atual");
		console.log(manipularFuncionario);
		
		funcionariosAPI.updateFuncionario(manipularFuncionario).success(function(data){
			console.log("Response");
			console.log(data);
			$scope.funcionarioForm.$setPristine();
			carregarFuncionarios();

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
	

	$scope.isFuncionarioSelecionado = function(funcionarios) {
		return funcionarios.some(function(funcionario){
			console.log(funcionario.selecionado);
			return !funcionario.selecionado;
		});
	}

	$scope.abrirModal = function(funcionario,acao) {
		console.log("Funcionario: ");
		console.log(funcionario);
		if(acao == 0) {
			$scope.manipularFuncionarioTitle = "Alterar funcionário: ";
			$scope.btnAcao = true;


			console.log(funcionario.FUN_DAT_NASCIMENTO);

			$scope.manipularFuncionario = funcionario;
		}
		if(acao == 1) {
			$scope.manipularFuncionarioTitle = "Cadastrar funcionário: ";
			$scope.btnAcao = false;
			$scope.manipularFuncionario = {};
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


	//carregarFuncionarios();
}]);
