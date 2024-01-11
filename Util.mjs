import main from "./index.mjs"
import chalk from 'chalk'

const showError = (msg) => {
	console.log(chalk.red(msg))
}

const showSuccess = (msg) => {
	console.log(chalk.green(msg))
}

const showMessage = (msg) => {
	console.log(chalk.blueBright(msg))
}

const waitForEnter = async() => {

	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
  
	console.log('Pressione a tecla "Enter" para continuar...');
  
	return new Promise((resolve) => {
	  	process.stdin.once('data', (key) => {
			if (key === '\r' || key === '\n') {
				process.stdin.pause();
				resolve(); // Resolve a Promise quando "Enter" é pressionado
				returnMainTimeout(0)
			}
	  	});
	});
}

const returnMainTimeout = (milisseconds) => {
	setTimeout(() => {
		return main()
	}, milisseconds)
}

const Util = {
	showError,
	showSuccess,
	showMessage,
	waitForEnter
}

export default Util