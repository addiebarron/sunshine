// default functionality, no commands

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import boxen from 'boxen'
import { prompt } from 'prompts'

const fsp = fs.promises;

import connect from './connection'
import argv from './args'
import configPrompts from './prompts/config'
import welcomePrompts from './prompts/welcome'

export async function run( ) {

	// load config file

	let config;

	try {
		const absPath = await path.resolve(approot, 'sunshine.config.json');
		const data = await fsp.readFile(absPath);
		config = JSON.parse(data);
	} catch (err) {
		const configParams = await welcomePrompts();
		// map config params from prompts to the structure of the config json
	}

	// do stuff with config / options

	if (argv.init) {
		require('./commands/init').handler();
	}

	else if (argv.test) {
		console.log('testing!');
	}

	// stash this functionality in a welcome flag for now, eventually call it from config.js
	else if (argv.welcome) {
		const answers = await welcomePrompts();

		if (answers.setup) {
			const configParams = await configPrompts();
			const config = {
				connection: {
					host: configParams.host,
					port: configParams.port,
					username: configParams.username,
					password: configParams.password
				},
				project: configParams.project || path.dirname(projroot),
				keyDir: configParams.keydir || path.resolve(projroot, '.sunshine')
			}
		}
		
		// then write to file
	}

	else {
		//const answers = await configPrompts();
		//connect(config);
	}
}