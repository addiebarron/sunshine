// utility functions

import fs from 'fs'
import path from 'path'

// check if a given path string can be resolved to an existing directory in the project
const dirExistsInProject = dir => {
	const fullPath = path.resolve( approot, dir );
	try {
		return fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()
	} catch (err) {
		return false;
	}
}

export { 
	dirExistsInProject
}