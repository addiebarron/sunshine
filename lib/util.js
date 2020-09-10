// utility functions

// check if a given path string can be resolved to an existing directory in the project

import fs from 'fs'
import path from 'path'

const dirExistsInProject = dir => {
	const fullPath = path.resolve( approot, dir );
	try {
		return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()
	} catch (err) {
		return false;
	}
}

// custom template literal log function

const log = (strings, ...vars) => {
	console.log(
		strings
			.map( (v,i) => [v, vars[i]] )
			.reduce( (a,b) => a.concat(b) )
			.join('')
	)
}

// export em

export { 
	dirExistsInProject,
	log
}