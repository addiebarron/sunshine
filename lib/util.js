// utility functions

import fs from 'fs'
import path from 'path'

export function pathify (name) {
	return path.resolve(approot, name);
}

// check if a given path string can be resolved to an existing directory in the project

export function dirExistsInProject (dir) {
	const fullPath = pathify(dir);
	try {
		return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()
	} catch (err) {
		return false;
	}
}

// custom template literal log function

/*
export function log (strings, ...vars) {
	console.log(
		strings
			.map( (v,i) => [v, vars[i]] )
			.reduce( (a,b) => a.concat(b) )
			.join('')
	)
}
*/