// default functionality, no commands

import { 
	promises as fs,

} from 'fs'
import path from 'path'
import chalk from 'chalk'
import boxen from 'boxen'
import { prompt } from 'prompts'

import connect from './connection'
import argv from './args'
import configPrompts from './prompts/config'
import welcomePrompts from './prompts/welcome'

import { pathify } from './util'

export async function run( ) {

	// load config file / write config file

	let config;

	try {
		const data = await fs.readFile(pathify('sunshine.config.json'));
		config = JSON.parse(data);
	} catch (err) {
		const answers = await welcomePrompts();
		if (answers.setup) {
			const configParams = await configPrompts();
			config = parseConfig(configParams);
		}
	}

	// do stuff with config / options

	if (argv.init) {
		require('./commands/init').handler();
	}

	else if (argv.test) {
		console.log('testing!');
	}

	else {
		console.log('running with config:\n', config);
		// connect(config);
	}
}

async function parseConfig(configParams) {

	const config = {
		connection: {
			host: configParams.host,
			port: configParams.port || 22,
			username: configParams.username,
			password: configParams.password
		},
		project: configParams.project || path.dirname(projroot),
		keyDir: configParams.keydir || path.resolve(projroot, '.sunshine')
	}

	const configPretty = JSON.stringify(config, null, 4);

	await fs.writeFile(pathify('sunshine.config.json'), configPretty);

	console.log(boxen(chalk.yellow('Thank you!'), { padding: 1, margin: 1 } ));
	console.log(`Your config settings have been written to ${chalk.yellow('sunshine.config.json')}:`);
	console.log(configPretty);

	return config;
}