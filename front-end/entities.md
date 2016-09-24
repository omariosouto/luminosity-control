Entidades: 
# - CLIENTE
# - FUNCIONARIO
# - PEDIDO
# - VEICULO


0 - Funcionario cadastrados pelo Entity
> Model: 
	IdFuncionario (int)
	Nome (varchar 50)
	Sobrenome (varchar 60)
	Email (varchar 60)
	Senha (varchar 40)
	CPF (varchar 13) UNIQUE
	Tel (varchar 15)
	Cel (varchar 15)
	Nascimento (date)
	Registro (date)
	loginHash (varchar 40)
	Nivel (0 = basico, 1 = admin)
	Endereco (varchar 140)

1 - Crud de Cliente
> Model: 
	IdCliente (int)
	Nome (varchar 50)
	Sobrenome  (varchar 60)
	Email (varchar 60)
	CPF (varchar 13) UNIQUE
	Tel (varchar 15)
	Cel (varchar 15)
	Nivel (0 = basico, 1 = admin)
	Endereco (varchar 140)

2 - Crud de Veiculo
> Model: 
	IdVeiculo (int)
	Modelo (varchar 20)
	km varchar(20)
	ano (varchar 4)
	placa (varchar 10)
	registro (DATA)
	status (varchar 1) 


3 - View de Pedido
> Model: 
	IdPedido (int)
	IdCliente (int)
	IdFuncionario (int)
	IdVeiculo (int)
	retorno (Future Date)
	registro (DATA NOW)

4 - Criar Diretivas
> Email, CPF, Telefone, Celular, Data de Nascimento, Select

## Desenvolvimento:
1 - Criar Views Simulando as interações e manipulações com base na estrutura

- 1 Login
-- 1.1 Cliente
--- Criar novo, listar todos, selecionar um e alterar ou apagar
-- 1.2 Carro
--- Criar novo, listar todos, selecionar um e alterar ou apagar
-- 1.3 Pedido
---- Seleciona um Cliente, Seleciona um Veículo, Seleciona um Veículo

2 - Aplicar ligação com o back-end e fazer os testes

3 - Passar para a Larissa e o Guilherme


