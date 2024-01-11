const mainQuestions 			= [
	{
		name: "choice", 
		message: "Qual sua escolha?", 
		type: "list", 
		choices: [
			"Criar conta", 
			"Consultar saldo", 
			"Depositar", 			 
			"Sacar", 		 
			"Sair", 
		],
		filter(val) {return val.toLowerCase()},
	},
]

const createAccountQuestions 	= [
	{name: 'accName', message: 'Digite seu nome'}
]

const checkBalanceQuestions 	= [
	{name: 'check', message: 'Digite o nome de quem deseja consultar o saldo'}
]

const depositQuestions 			= [
	{name: 'depositName', message: 'Digite o nome no qual deseja depositar'}, 
	{name: 'depositValue', message: 'Digite o valor que deseja depositar'}
]

const withdrawQuestions 		= [
	{name: 'withdrawName', message: 'Digite o nome no qual deseja sacar'}, 
	{name: 'withdrawValue', message: 'Digite o valor que deseja sacar'}
]

const Questions = {
	mainQuestions,
	createAccountQuestions,
	checkBalanceQuestions,
	depositQuestions,
	withdrawQuestions,
}

export default Questions


