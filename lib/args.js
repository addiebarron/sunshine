// parse arguments, set up expected args/commands, create help page

import yargs from 'yargs'

const cli_options = {
	config: {
		alias: "c",
	},

	verbose: {
	    alias: "v",
	    type: "boolean",
	    default: false,
	    description: "Run with verbose logging."
	},

	init: {
		alias: "i",
		type: "boolean",
		default: false,
		description: "Create and populate a sunshine.config.json file before performing any other tasks."
	},
	
	bundle: {
		alias: "b",
		type: "string",
		default: ".",
		description: "Specify a bundle directory and only transfer files in that directory."
	},

	git: {
		alias: "g",
		type: "boolean",
		default: true,
		description: "Transfer only the file versions that have been committed via git."
	},

	yes: {
		alias: "y",
		type: "boolean",
		default: false,
		description: "Use the default config options for any tasks performed."
	},

	all: {
		alias: "a",
		type: "boolean",
		default: false,
		description: "Deploy all files in their current form."
	}
}

export default yargs
	.options( cli_options )
	.commandDir( './commands' ) // cmds loaded as modules from the commands dir
	.help()
	.argv
