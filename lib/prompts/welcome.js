import boxen from 'boxen'
import chalk from 'chalk'
import { prompt } from 'prompts'

export default async function () {
	const preprompt = console.log( 
		boxen( 
			chalk.yellow('Welcome to sunshine!'), 
			{ padding: 1, margin: 1 } 
		)
	);

	const questions = [
		{
			type: 'confirm',
	        name: 'setup',
	        message: chalk.yellow(`It looks like there isn't an existing sunshine configuration in this directory or any of its parents. Would you like to create one here?`),
	        initial: true,
		}
	]

	return await prompt(questions);
}