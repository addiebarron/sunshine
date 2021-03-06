import path from 'path'
import prompt from 'prompts'
import { dirExistsInProject } from '../util'

import boxen from 'boxen'
import chalk from 'chalk'

export default async function () {
	const preprompt = console.log( boxen( `Welcome to the hut of the ${chalk.yellow(`sunshine witch`)}. 

Here, you will choose your configuration settings, 
which will determine how the "sunshine" command 
will deploy your project. I'll store these settings 
in a "sunshine.config.json" file in your project's root 
directory. By default, your project will be deployed in 
its entirety, up to the most recent git commit, and we'll 
expect you to enter your ssh credentials on every deploy.
Sounds tedious? Let's make it all automatic.

Press enter to continue.`, { padding: 1, margin: 1, borderStyle: 'double' }));

	const pressEntertoContinue = await prompt([
		{
			type: 'confirm',
			name: 'pressEnter',
			message: '',
			initial: true,
		}
	]);

	const questions = [
		{
	        type: 'text',
	        name: 'project',
	        message: `What is the name of your project? (e.g. "sunshine", "mywebsite.com" etc.)`,
	    },

	    // git settings
	    {
	        type: 'confirm',
	        name: 'using_git',
	        message: `Are you using git for version control?`,
	        initial: true,
	    },
	    {
	        type: prev => prev ? 'confirm' : null,
	        name: 'gitmode',
	        message: `Lovely. Then, would you like to deploy only up to the most recent git commit? This will ensure that uncommitted (and therefore possibly experimental or broken) files will not be sent to the remote server. This can always be overridden with the --no-git flag.`,
	        initial: true,
	    },

		// bundle settings
	    {
	        type: 'select',
	        name: 'using_subdir',
	        message: `Are you planning to deploy your project's full directory structure, or just a subdirectory? (If you're using a bundler like webpack or rollup, you might want to choose only the "dist" or "public" directory, for instance.)`,
	        choices: [
                { title: 'Full structure', value: false },
                { title: 'Just a subdirectory', value: true },
            ],
	        initial: false,
	    },
	    {
	        type: prev => prev ? 'text' : null,
	        name: 'subdir',
	        message: 'Which subdirectory are you deploying from? (This will be the root directory of your remote project/web site.)',
	        validate: value => !dirExistsInProject(value) ? `Looks like that directory isn't part of your project.` : true,	    },

	    // server authentication
	    {
	        type: 'text',
	        name: 'host',
	        message: `Please enter the remote address (IP or domain name) of the server you'd like to deploy to by default. `,
	    },
	    {
	        type: 'text',
	        name: 'username',
	        message: `Thanks! Now, let's get the server's login credentials. \nUsername?`,
	    },
	    {
	        type: 'password',
	        name: 'password',
	        message: `And password?`,        
	    },

	    // key settings
	    {
	    	type: 'confirm',
	    	name: 'use_custom_keydir',
	    	message: `By default, we'll create a public key for your server and store it in a hidden directory at your project root called ".sunshine". Would you like to use a custom directory instead?`,
	    	initial: false,
	    },
	    {
	        type: prev => prev ? 'text' : null,
	        name: 'keydir',
	        message: 'Which subdirectory would you like to use for your key file?',
	        validate: value => dirExistsInProject(value) ? `Looks like that directory isn't part of your project.` : true,
	        format: value => fs.realpathSync(value.toLowerCase()),
	    },
	];

	return await prompt(questions);
}