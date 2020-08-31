let connectWith = require('./connection');
let fs = require('fs');

/* called in executable */
export function cli(argv) {
	let data = fs.readFileSync('sunshine.config.json')
	let config = JSON.parse(data);

	if (argv.config) {
		console.log( JSON.stringify(config) );
	}

	// connectWith(config);
}
