// Third Party modules
import chalk from 'chalk'
import inquirer from 'inquirer'

// Core module
import fs from 'fs'

// First party modules
import Questions from './Questions.mjs'
import Actions from './Actions.mjs'
import File from './File.mjs'
import Util from './Util.mjs'

/* MAIN */
const createFiles = () => {

	if (!fs.existsSync(File.dir)) {
		fs.mkdirSync(File.dir)
	}

	if (!fs.existsSync(File.filePath)) {
		fs.appendFileSync(File.filePath, "", async(err) => {
			if (err) {
				showError(err.message)
				await waitForEnter()
			}
		})
	}
	
}

const main = () => {

	createFiles()

	console.clear()

	console.log(chalk.yellow(`--${new Date().toISOString()}--`))

	inquirer.prompt(Questions.mainQuestions).then(answers => {

		//console.log("ANSWERS: ", answers)

		switch (answers.choice) {
			case "criar conta":
				Util.showMessage("-- Criação de conta --")
				Actions.createAccount(100)
				break;
			case "consultar saldo":
				Util.showMessage("-- Consulta de saldo --")
				Actions.checkBalance()				
				break;
			case "depositar":
				Util.showMessage("-- Depositar --")				
				Actions.deposit()				
				break;
			case "sacar":
				Util.showMessage("-- Sacar --")				
				Actions.withdraw()				
				break;	
			case "sair":
				console.log(chalk.bgRed.white('Saindo...'))
				process.exit()
			default:
				main()
				break;
		}

	}).catch(
		err => {
			console.log(err)
			return main()
		}
	)
}

main()

export default main