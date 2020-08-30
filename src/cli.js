/* called in executable */
export function cli(args) {

	let Client = require('ssh2').Client;

	let conn = new Client();

	let connSettings = {
		// set these via args / config file
		host: '100.19.128.124',
		port: 22,
		username: 'addie',
		password: 'mayohotsauce'
		// You can use a key file too, read the ssh2 documentation
	}

	let remotePath = '/var/www/test'

	conn.on('ready', function() {
	    conn.sftp( function(err, sftp) {
	        if (err) throw err;

	        let fs = require("fs");

	        let readStream = fs.createReadStream(PWD + localFile);
        	let writeStream = sftp.createWriteStream(remotePath + remoteFile);

        	writeStream.on('close',function () {
	            console.log( "- file transferred succesfully" );
	        });

	        writeStream.on('end', function () {
	            conn.close();
	            console.log( "sftp connection closed" );
	        });

	        readStream.pipe( writeStream );
			// you'll be able to use sftp here
			// Use sftp to execute tasks like .unlink or chmod etc
	    });
	}).connect(connSettings);
	
}


