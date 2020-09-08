// sunshine init

import configPrompts from '../prompts/config';

const command = 'init';
const aliases = ['i'];
const describe = 'Create and populate a sunshine.config.json file. By default, overwrites only the properties that are passed via command line arguments or the prompt.';
const builder = {
	yes: {
		alias: "y",
		type: "boolean",
		default: false,
		description: "Skip prompt and initialize config file using the default options.",
	},

	force: {
		alias: "f",
		type: "boolean",
		default: false,
		description: "Delete any existing sunshine.config.json files before generating a new one."
	},
};

const handler = async argv => {
	const answers = await configPrompts();

	console.log('run called with answers:')
	console.log(answers);
	// here we'd call "cli" "connect" or "main"
}

export { 
	command,
	aliases,
	describe,
	builder,
	handler,
}