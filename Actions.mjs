import Util from "./Util.mjs"
import inquirer from 'inquirer'
import fs from 'fs'
import Questions from './Questions.mjs'
import File from './File.mjs'

// Actually make the changes
const BODY_createAccount = (acc) => {
	try {
		const fileData = fs.readFileSync(File.filePath, 'utf8')
		let dataToAdd

		// No users yet
		if (!fileData) {
			dataToAdd = [acc]
		} else {
			const existingData = JSON.parse(fileData)
			// Check for duplicates
			existingData.forEach(data => {
				if (data.name === acc.name) {
					throw new Error("Nome já usado.")
				}
			})
			dataToAdd = [...existingData, acc]
		}

		fs.writeFile(File.filePath, JSON.stringify(dataToAdd, null, 2), 'utf8', err => {if (err) throw err})

	} catch (error) {
		throw error
	}
}
const BODY_checkBalance = (name) => {
	try {
		
		const fileData = fs.readFileSync(File.filePath, 'utf8')

		const parsedData = JSON.parse(fileData)

		let found = false
		parsedData.map(data => {
			if (data.name === name) {
				found = true
				Util.showSuccess(`Saldo de ${name} é ${data.value}`)
			}
		})
		if (!found) {
			throw new Error('Nome não encontrado.')
		} 

	} catch (error) {
		throw error
	}
}
const BODY_deposit = (name, value) => {

	try {
		
		const fileData = fs.readFileSync(File.filePath, 'utf-8')

		const parsedData = JSON.parse(fileData)

		let found = false
		parsedData.forEach(data => {
			if (data.name === name) {
				found = true
				data.value += Number.parseFloat(value)
			}
		})
		
		if (!found) {
			throw new Error('Nome não encontrado.')
		}

		fs.writeFileSync(File.filePath, JSON.stringify(parsedData, null, 2), 'utf8', err => {if (err) throw err})

	} catch (error) {
		throw error
	}

}
const BODY_withdraw = (name, value) => {
	try {
		
		const fileData = fs.readFileSync(File.filePath, 'utf-8')

		const parsedData = JSON.parse(fileData)

		let found = false
		parsedData.forEach(data => {
			if (data.name === name) {
				found = true
				data.value -= Number.parseFloat(value)
			}
		})
		
		if (!found) {
			throw new Error('Nome não encontrado.')
		}

		fs.writeFileSync(File.filePath, JSON.stringify(parsedData, null, 2), 'utf8', err => {if (err) throw err})

	} catch (error) {
		throw error
	}
}

// Actions
const createAccount = (baseValue) => {

	inquirer.prompt(Questions.createAccountQuestions).then(async(answers) => {

		const acc = {name: answers.accName, value: baseValue}
		BODY_createAccount(acc)

		Util.showSuccess("Conta criada com sucesso!")
		await Util.waitForEnter()

	}).catch(async(err) => {
		Util.showError(err.message)
		await Util.waitForEnter()
	})
}
const checkBalance = () => {
	inquirer.prompt(Questions.checkBalanceQuestions).then(async(answers) => {
		
		BODY_checkBalance(answers.check)

		// Return to main
		await Util.waitForEnter()

	}).catch(async(err) => {
		Util.showError(err.message)
		await Util.waitForEnter()
	})
}
const deposit = () => {
	inquirer.prompt(Questions.depositQuestions).then(async(answers) => {
		
		BODY_deposit(answers.depositName, answers.depositValue)

		// Return to main
		Util.showSuccess(`'${answers.depositValue}' adicionado a conta de '${answers.depositName}' com sucesso.`)
		await Util.waitForEnter()

	}).catch(async(err) => {
		Util.showError(err.message)
		await Util.waitForEnter()
	})
}
const withdraw = () => {
	inquirer.prompt(Questions.withdrawQuestions).then(async(answers) => {
		
		BODY_withdraw(answers.withdrawName, answers.withdrawValue)

		// Return to main
		Util.showSuccess(`'${answers.withdrawValue}' sacado da conta de '${answers.withdrawName}' com sucesso.`)
		await Util.waitForEnter()

	}).catch(async(err) => {
		Util.showError(err.message)
		await Util.waitForEnter()
	})
}

const Actions = {
	createAccount,
	checkBalance,
	deposit,
	withdraw
}

export default Actions